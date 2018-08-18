
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';

import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'api',
    templateUrl: './api.component.html',
  })
  
export class ApiComponent implements OnInit {

    output:string;

    constructor(route: ActivatedRoute) {
        let action = route.snapshot.params['action'];

        switch(action)
        {
            case "getMonthEvents":
                this.output="["
                    +"{\"id\":100,\"type\":2,\"category\":3,\"subCategory\":1,\"detail\":\"test\",\"registerDate\":\"2018/04/01\"},"
                    +"{\"id\":102,\"type\":2,\"category\":7,\"subCategory\":1,\"detail\":\"test\",\"registerDate\":\"2018/04/01\"},"
                    +"{\"id\":103,\"type\":2,\"category\":4,\"subCategory\":1,\"detail\":\"test\",\"registerDate\":\"2018/04/01\"},"
                    +"{\"id\":104,\"type\":2,\"category\":3,\"subCategory\":1,\"detail\":\"test\",\"registerDate\":\"2018/04/03\"},"
                    +"{\"id\":105,\"type\":2,\"category\":7,\"subCategory\":1,\"detail\":\"test\",\"registerDate\":\"2018/04/03\"},"
                    +"{\"id\":106,\"type\":2,\"category\":4,\"subCategory\":1,\"detail\":\"test\",\"registerDate\":\"2018/04/03\"},"
                    +"{\"id\":107,\"type\":2,\"category\":5,\"subCategory\":1,\"detail\":\"test\",\"registerDate\":\"2018/04/03\"},"
                    +"{\"id\":101,\"type\":1,\"category\":13,\"subCategory\":1,\"detail\":\"test\",\"registerDate\":1520080980000}]"
                    ;
                break;
        }
    }
    ngOnInit() {
    }
}