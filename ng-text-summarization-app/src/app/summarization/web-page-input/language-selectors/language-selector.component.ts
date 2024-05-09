import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="language-selectors">
      <label for="from">
        <span>Language: </span>
        <select [(ngModel)]="code" name="from">
          @for (language of languages(); track language.code) {
            <option value="{{ language.code }}">{{ language.name }}</option>
          }
        </select>
      </label>
    </div>
  `,
  styles: `
    .language-selectors {
      width: 50%;
      margin-bottom: 0.75rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageSelectorComponent {
  languages = input.required<{ code: string; name: string }[]>();
  code = model('en');
}
