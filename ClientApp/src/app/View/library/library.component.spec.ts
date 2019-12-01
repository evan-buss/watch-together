import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryComponent } from './library.component';
import { MetadataModalComponent } from 'src/app/Component/library/metadata-modal/metadata-modal.component';
import { MetadataItemComponent } from 'src/app/Component/library/metadata-modal/metadata-item/metadata-item.component';
import { FormsModule } from '@angular/forms';
import { LibraryMovieCardComponent } from 'src/app/Component/library/library-movie-card/library-movie-card.component';
import { PaginationComponent } from 'src/app/Component/library/metadata-modal/pagination/pagination.component';
import { HttpClientModule } from '@angular/common/http';

describe('LibraryComponent', () => {
  let component: LibraryComponent;
  let fixture: ComponentFixture<LibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule],
      declarations: [LibraryComponent, MetadataModalComponent, MetadataItemComponent, LibraryMovieCardComponent, PaginationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
