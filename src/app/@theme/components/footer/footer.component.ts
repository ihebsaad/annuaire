import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
      <span class="created-by">Annuaire des entreprises © 2018</span>
    <div class="socials">
        <a href="https://www.facebook.com/entreprise.esolutions/" target="_blank" class="ion ion-social-facebook"></a>
        <a href="https://twitter.com/e_esolutions" target="_blank" class="ion ion-social-twitter"></a>
        <a href="https://www.linkedin.com/company/9177671/" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
      <div class=" " style="margin-left:20px;margin-right:20px">
          <a href="#main-content" class="fa fa-lg fa-arrow-circle-up "></a>
      </div>
  `,
})
export class FooterComponent {
}
