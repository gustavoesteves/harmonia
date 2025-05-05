import { CommonModule } from '@angular/common';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Scale, Note, Interval } from 'tonal';
import * as Vex from 'vexflow';

@Component({
  selector: 'app-introducao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './introducao.component.html',
  styleUrl: './introducao.component.scss'
})
export class IntroducaoComponent {
  
}