import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { TypeMoneis } from '@/_models/monies';
import { AlertService, TypeMoneyService, ExchangeService } from '@/_services';

@Component({ templateUrl: 'exchange.component.html' })
export class ExchangeComponent implements OnInit {
    registerForm: FormGroup;
    listMoney: TypeMoneis[];
    loading = false;
    submitted = false;
    exchange: string;
    differentMonies: string;

    constructor(
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        private typeMoneyService: TypeMoneyService,
        private exchangeService: ExchangeService
    ) {
        this.differentMonies = 'Elegir monedas diferentes...';
    }

    ngOnInit() {
        this.alertService.clear();
        this.registerForm = this.formBuilder.group({
            from: ['', Validators.required],
            to: ['', Validators.required],
            rate: ['', [Validators.required]]
        });
        this.getListMonies();
    }

    getListMonies(){
        this.typeMoneyService.getAll()
        .pipe(first())
        .subscribe(data => {
            this.listMoney = data;
        },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }


    sameMonies(){
        return this.registerForm.value.from == this.registerForm.value.to;
    }

    emptyMonies(){
        return this.registerForm.value.from == '' || 
        this.registerForm.value.to == '';
    }

    filterExchange() {
        
        if(this.emptyMonies()){
            return;
        }

        if(this.sameMonies()){
            this.alertService.error(this.differentMonies);
            return;
        }
        console.log(this.registerForm.value);

        this.exchangeService.getExchange(this.registerForm.value).pipe(first())
        .subscribe(data => {
            console.log(data);
            this.exchange = data;
        },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }

    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        this.alertService.clear();
        if(this.emptyMonies()){
            this.alertService.error("Debe elegir los tipos de moneda...");
            return;
        }

        if(this.sameMonies()){
            this.alertService.error(this.differentMonies);
            return;
        }

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.exchangeService.executeExchange(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {                    
                    let resultado = 'Cambio de '+data.moneyOrigen+ ' a '+
                    data.moneyDestiny+ ' es, '+ data.symbol +' '+data.amountUpdate;
                    this.alertService.success(resultado, true);
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
