import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import videojs, { VideoJsPlayer } from "video.js";

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: [
    '../../../../node_modules/video.js/dist/video-js.min.css',
  ],
  encapsulation: ViewEncapsulation.None
})
export class VideoPlayerComponent implements OnInit, AfterViewInit {
  idPlayer;
  url = 'https://vjs.zencdn.net/v/oceans.mp4';
  type = 'video/mp4';
  video: VideoJsPlayer;

  constructor() { }

  ngOnInit() {
    this.idPlayer = Math.ceil(Math.random() * 1000);
  }

  ngAfterViewInit() {
    const elementId = `video_${this.idPlayer}`;
    this.video = videojs(elementId);
  }
}
