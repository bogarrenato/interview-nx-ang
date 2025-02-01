import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-featurelib1',
  imports: [CommonModule],
  templateUrl: './featurelib1.component.html',
  styleUrl: './featurelib1.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Featurelib1Component {}
