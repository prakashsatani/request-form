import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http'
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from './request.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit {
  form: any = {
    staff: [],
    startDate: null,
    endDate: null,
    priority: null,
    description: null,
  };
  staffData: any;
  errorMessage = '';
  selectedItems = [];
  dropdownSettings: any = {};
  constructor(
    private requestService: RequestService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private ActivatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.staffData = [
      { item_id: 1, item_text: 'New Delhi' },
      { item_id: 2, item_text: 'Mumbai' },
      { item_id: 3, item_text: 'Bangalore' },
      { item_id: 4, item_text: 'Pune' },
      { item_id: 5, item_text: 'Chennai' },
      { item_id: 6, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false
    };
    if (!this.tokenStorage.getToken()) {
      location.replace('login')
    } else {
      this.getLoadStaff();
    }

  }

  getLoadStaff(): void {
    this.requestService.getStaff().subscribe(
      response => {
        this.staffData = response;

      },
      err => {

      }
    )
  }
  onSubmit(): any {
    console.log(this.form);

    const staffData = this.form.staff;
    const queryObj = staffData.map((s: any) => (s.id))
    delete this.form.staff;

    const string = new HttpParams({ fromObject: { ToLoginIds: queryObj.join(',') } }).toString()
    this.requestService.createRequest(string, this.form).subscribe(
      res => {
        console.log(res);

        this.form.staff = [];
        this.form.startdate = null;;
        this.form.enddate = null;;
        this.form.description = null;;
        this.form.priority = null;;
        this.errorMessage = 'Request Form Successfully submitted'
      },
      err => {
        console.log(err);
        this.errorMessage = 'Something wrong!'
      }
    )
  }

  onItemSelect(item: any) {
    console.log('onItemSelect', item);
  }
  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }
}
