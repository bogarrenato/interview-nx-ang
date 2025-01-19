import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { ItemDetailsComponent } from './item-details.component';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LOADING_REQUEST, WebRequest } from 'src/app/core/types/webrequest';
import { Item } from 'src/app/core/models/item';
import { ItemDetailsStore } from './store/item-details.store';

describe('ItemDetailsComponent', () => {
  let component: ItemDetailsComponent;
  let fixture: ComponentFixture<ItemDetailsComponent>;

  const detailsSubject = new BehaviorSubject<WebRequest<Item>>(LOADING_REQUEST);

  const mockItemDetailStore = {
    details$: detailsSubject.asObservable(),
    getDetails: jest.fn(),
  };

  const mockItemID = '1';
  const mockActivatedRoute = {
    snapshot: {
      params: {
        id: mockItemID,
      },
    },
  };

  const mockItemService = {
    // Mock methods used by ItemDetailsStore
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemDetailsComponent],
      providers: [
        {
          provide: ItemDetailsStore,
          useValue: mockItemDetailStore,
        },
        // { provide: ItemService, useValue: mockItemService },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
      ],
    })
      .overrideComponent(ItemDetailsComponent, {
        set: {
          providers: [
            {
              provide: ItemDetailsStore,
              useValue: mockItemDetailStore,
            },
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ItemDetailsComponent);
    component = fixture.componentInstance;

    // TestBed.overrideProvider(ItemDetailsStore, {
    //   useValue: mockItemDetailStore,
    // });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call get details with id from routing', fakeAsync(() => {
    const getDetailsSpy = jest.spyOn(mockItemDetailStore, 'getDetails');

    expect(getDetailsSpy).toHaveBeenCalledWith(mockItemID);
  }));
});
