import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Application, Container, Graphics } from 'pixi.js'
import { Creation, GET_CREATIONS, GetCreationsResponse } from '../../../../graphql-types/creation';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-web-page',
  imports: [],
  templateUrl: './web-page.html',
  styleUrl: './web-page.scss',
})
export class WebPage implements OnInit {
  @ViewChild('web') webRef!: ElementRef<HTMLDivElement>;
  private apollo: Apollo = inject(Apollo)
  private router: Router = inject(Router)

  app = new Application();
  heldDown = false;
  webContainer = new Container;
  stories: Creation[] = []

  generateNode(x: number, y: number, id: string) {
    const node = new Graphics();

    node.rect(0, 0, 100, 100)
    node.x = x;
    node.y = y

    node.fill(0xffffff);

    node.eventMode = 'dynamic';
    node.cursor = 'pointer'
    node.on('pointertap', () => {
      this.router.navigate(['archive', id])
    })
    return node
  }

  generateConnection(node1: Graphics, node2: Graphics) {
    const connection = new Graphics();

    connection.rect(-5, 0, 10, Math.hypot(node2.x - node1.x, node2.y - node1.y))

    connection.position.set(node1.position.x + (node1.height / 2), node1.position.y + (node1.width / 2))
    connection.fill(0x0000000);
    connection.zIndex = -1

    connection.rotation = Math.atan2(node2.y - node1.y, node2.x - node1.x) - Math.PI / 2;

    this.webContainer.addChild(connection)
  }

  async buildWeb() {
    await this.app.init({ background: '#1a252f', resizeTo: this.webRef.nativeElement })
    this.webRef.nativeElement.appendChild(this.app.canvas)

    const nodes = new Map<string, Graphics>();
    const addedStories = new Map<string, Creation>();

    for (const story of this.stories) {
      let node: Graphics | undefined;
      for (let attempt = 0; attempt < 200; attempt++) {
        const x = Math.random() * this.app.screen.width;
        const y = Math.random() * this.app.screen.height;
        let tooClose = false;
        for (const existing of nodes.values()) {
          if (Math.hypot(existing.x - x, existing.y - y) < 200) {
            tooClose = true;
            break;
          }
        }
        if (!tooClose) {
          node = this.generateNode(x, y, story.id);
          break;
        }
      }
      if (!node) { continue; }

      for (const relatedId of story.relations) {
        const existingNode = nodes.get(relatedId);
        if (existingNode) {
          this.generateConnection(node, existingNode);
        }
      }
      for (const [existingId, existingStory] of addedStories) {
        if (existingStory.relations.includes(story.id)) {
          const existingNode = nodes.get(existingId);
          if (existingNode) {
            this.generateConnection(existingNode, node);
          }
        }
      }

      nodes.set(story.id, node);
      addedStories.set(story.id, story);
      this.webContainer.addChild(node);
    }

    this.app.stage.addChild(this.webContainer)
  }

  ngOnInit() {
    this.apollo.query<GetCreationsResponse>({
      query: GET_CREATIONS,
      variables: {
        category: "story",
        page: 1
      }
    }).subscribe({
      next: ({ data }) => {
        this.stories = data!.getCreations;
        this.buildWeb()
      }
    })
  }

  onClick() {
    this.heldDown = true
  }

  onDrag(event: MouseEvent) {
    if (!this.heldDown) { return };
    this.webContainer.x += event.movementX
    this.webContainer.y += event.movementY
  }

  onRelease() {
    this.heldDown = false
  }

  onScroll(event: WheelEvent) {
    if (this.webContainer.scale.x + (event.deltaY / 1000) <= 0.1 || this.webContainer.scale.x + (event.deltaY / 1000) >= 1.5) { return; }
    this.webContainer.scale.x += event.deltaY / 1000
    this.webContainer.scale.y += event.deltaY / 1000
  }
}
