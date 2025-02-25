import { Component, OnInit, NgZone } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { APP_CONFIG } from '../environments/environment';
import { Router } from '@angular/router';
import { TonalService } from "./services/tonal.service";
import { IConfig } from './services/interfaces/config.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data: any[] = [];

  config: IConfig = {
    InitialTone: '',
    RecordTone: false,
    LastTone: '',
    InitialInstrument: '',
    RecordInstrument: false,
    LastInstrument: ''
  };

  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
    private router: Router,
    private tonalService: TonalService,
    private ngZone: NgZone) {

    this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    if ((window as any).electron) {
      //recebendo navegação do menu
      (window as any).electron.receive('navigate-to', (route: string) => {
        this.ngZone.run(() => {
          this.router.navigate([route]);
        });
      });
      //recebendo alteração de Tonalidade do menu
      (window as any).electron.receive('tone', (note: string) => {
        if (note !== "") {
          this.tonalService.pushTonality(note);
        }
      });
    }
    //carregando a tonalidade do config.json
    this.LoadConfig();
  }

  async LoadConfig() {
    try {
      this.config = await (window as any).electron.readData('config.json');
      this.tonalService.pushTonality(this.config.InitialTone);
    } catch (error) {
      console.error('Error loading config:', error);
    }
  }

}
