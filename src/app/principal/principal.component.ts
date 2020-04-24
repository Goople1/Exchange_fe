import { Component, OnInit } from '@angular/core';
import { AlertService } from '@/_services';

@Component({ templateUrl: 'principal.component.html' })
export class PrincipalComponent implements OnInit {
    yapeImageUrl: string;

    constructor(
        private alertService: AlertService
    ) {
        this.yapeImageUrl = "https://lh3.googleusercontent.com/DXIyLCA8vtDhW2bmwTNm7vFJ7mUimu-kw1O9PErIMkNxQxW7fzd6eAI4HfIbbRn3CICv=w412-h220-rw";
    }

    ngOnInit() {
        this.alertService.clear();
    }
}