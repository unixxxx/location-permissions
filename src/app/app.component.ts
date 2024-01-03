import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { IonicModule, Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class AppComponent implements AfterViewInit {
  constructor(private platform: Platform) {}
  ngAfterViewInit(): void {
    this.platform.ready().then(() => {
      navigator.geolocation.getCurrentPosition(
        () => console.log('getCurrentPosition success'),
        () => console.log('getCurrentPosition error')
      );
    });
  }
}
