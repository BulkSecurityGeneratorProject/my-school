import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IAddress } from 'app/shared/model/address.model';
import { AddressService } from './address.service';
import { IActor } from 'app/shared/model/actor.model';
import { ActorService } from 'app/entities/actor';

@Component({
    selector: 'jhi-address-update',
    templateUrl: './address-update.component.html'
})
export class AddressUpdateComponent implements OnInit {
    address: IAddress;
    isSaving: boolean;

    actors: IActor[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected addressService: AddressService,
        protected actorService: ActorService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ address }) => {
            this.address = address;
        });
        this.actorService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IActor[]>) => mayBeOk.ok),
                map((response: HttpResponse<IActor[]>) => response.body)
            )
            .subscribe((res: IActor[]) => (this.actors = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.address.id !== undefined) {
            this.subscribeToSaveResponse(this.addressService.update(this.address));
        } else {
            this.subscribeToSaveResponse(this.addressService.create(this.address));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAddress>>) {
        result.subscribe((res: HttpResponse<IAddress>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackActorById(index: number, item: IActor) {
        return item.id;
    }
}