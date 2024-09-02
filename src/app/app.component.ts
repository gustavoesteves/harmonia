import { Component, OnInit, NgZone } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { APP_CONFIG } from '../environments/environment';
import { Router } from '@angular/router';
import { TonalService } from "./services/tonal.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data: any[] = [];

  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
    private router: Router,
    private tonalService: TonalService,
    private ngZone: NgZone) {

    this.translate.setDefaultLang('en');
    console.log('APP_CONFIG', APP_CONFIG);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
    } else {
      console.log('Run in browser');
    }
    //alterando a tonalidade
    (window as any).electron.receive('tone', (note: string) => {
      if (note !== "") {
        this.tonalService.pushTonality(note);
        console.log('note' + note);
      }
    });
  }

  ngOnInit() {
    if ((window as any).electron) {
      //navegação do menu
      (window as any).electron.receive('navigate-to', (route: string) => {
        this.ngZone.run(() => {
          this.router.navigate([route]);
        });
      });
    }
  }

  
}
