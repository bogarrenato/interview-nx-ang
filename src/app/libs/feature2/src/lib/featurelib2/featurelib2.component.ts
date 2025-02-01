import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-featurelib2',
  imports: [CommonModule],
  templateUrl: './featurelib2.component.html',
  styleUrl: './featurelib2.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Featurelib2Component {}
