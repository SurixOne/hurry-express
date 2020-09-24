import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('250ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('250ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public emptyTrackingNumber = false;
  public showMenu = false;
  public infoSuccess = false;
  public trackNumber = '';
  public invalidNumber = false;
  public trackingInfo = {
    country:'',
    trackNumber:'',
    date:''
  }
  public trackingText = ''

  constructor(private dbService: ApiService) { }

  ngOnInit(): void {
    // this.searchCode2('abc123');
  }
  searchCode(number){
    if(number){
     this.dbService.postTrackingNumber(number).subscribe(res=>{
        //handling cases returned by backend here
     });
    }else{
      //boolean used to mark error in form, empty tracking number
      this.emptyTrackingNumber = true;
    }
  }

  searchCode2(trackingNumber){
    
    if(trackingNumber === ''){
      //tracking number not found
      this.emptyTrackingNumber = true;
      this.infoSuccess = false;
    }else{
      this.emptyTrackingNumber = false;
    }
     this.dbService.getDB().pipe(map(r=>{
      let element = 'not found'
      r.db.forEach(el => {
        if(el.trackNumber === trackingNumber){
          element = el;
        }
      });
      return element as any;
    })).subscribe(r=>{
        console.log(r)
        if(r=='not found'){
          //tracking number not found
          this.infoSuccess = false;
          console.log('tn: ' + trackingNumber)
          if(trackingNumber!==''){
            this.invalidNumber = true;
            this.emptyTrackingNumber = false;
          }else{
            this.invalidNumber = false;
          }
        }else{
          this.trackingInfo = r;          
          this.trackingText = 
          'tracking number: ' + this.trackingInfo.trackNumber+' \n country: '+this.trackingInfo.country
          this.infoSuccess = true;
          this.invalidNumber = false;
          this.emptyTrackingNumber = false;
        }
      });
  }

}