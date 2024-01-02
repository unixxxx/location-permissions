import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import {
  NgxLeafletLocateComponent,
  NgxLeafletLocateModule,
} from '@runette/ngx-leaflet-locate';
import {
  Control,
  MapOptions,
  PathOptions,
  latLngBounds,
  Map,
  tileLayer,
} from 'leaflet';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    LeafletModule,
    NgxLeafletLocateModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  ],
})
export class Tab1Page implements AfterViewInit {
  @ViewChild(NgxLeafletLocateComponent)
  locateComponent: NgxLeafletLocateComponent | undefined;

  _map: Map | undefined;

  DEFAULT_FIT_BOUNDS = latLngBounds([
    { lat: 37, lng: -97 },
    { lat: 36, lng: -96 },
  ]);

  options: MapOptions = {
    zoomControl: false,
    tap: true,
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...',
      }),
    ],
  };

  locateOptions: Control.LocateOptions = {
    flyTo: false,
    position: 'topright',
    locateOptions: {
      enableHighAccuracy: false,
    },
    showCompass: false,
    compassStyle: {
      radius: 10,
      width: 12,
      depth: 8,
    } as PathOptions, // Expected type from package is wrong
    showPopup: false,
    drawCircle: true,
    onLocationError() {},
  };

  ngAfterViewInit(): void {
    this.locateComponent?.control.start();
  }

  onMapReady(map: Map): void {
    this._map = map;
    this._map.attributionControl.remove();
    this._map.invalidateSize();
    window.dispatchEvent(new Event('resize'));
  }
}
