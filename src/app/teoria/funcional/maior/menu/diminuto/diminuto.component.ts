import { CommonModule } from '@angular/common';
import { Component, NgZone } from '@angular/core';
import { TonalService } from '../../../../../services/tonal.service';

@Component({
  selector: 'app-diminuto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './diminuto.component.html',
  styleUrl: './diminuto.component.scss'
})
export class DiminutoComponent {

  constructor(private tonalService: TonalService, 
      private ngZone: NgZone
    ) { }
  
    ngOnInit() {
      this.tonalService.currentTonality.subscribe(value => {
        const note = value[value.length - 1];
      });
    }
}
