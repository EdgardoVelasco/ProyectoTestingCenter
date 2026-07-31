import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {forkJoin, map, Observable, of, switchMap} from 'rxjs';
import {ExamCatalogItem, RequestCatalogs} from '../domain/catalog.models';
import {RUNTIME_CONFIG, RuntimeConfig} from '../../../core/runtime-config';

interface CatalogPage {
  content: Array<{
    id: string; vendor: string; courseName: string; examCode: string; examName: string;
    retake?: string | null; baseCost: number; baseCurrency: 'USD';
    comments?: string | null; active: boolean;
  }>;
  totalPages: number;
}

const COMMERCIAL = {
  courseTypes: [{id:'course-na',code:'NA',name:'N/A'},{id:'course-intensive',code:'INT',name:'Intensivo'},{id:'course-digital',code:'DIG',name:'Digital'}],
  segments: [{id:'segment-cn',code:'CN',name:'Comercial'}],
  locations: [
    {id:'location-bog',code:'BOG',name:'Bogotá'},{id:'location-med',code:'MED',name:'Medellín'},
    {id:'location-wtc',code:'WTC',name:'México'},{id:'location-scl',code:'SCL',name:'Chile'},
    {id:'location-lim',code:'LIM',name:'Perú'},{id:'location-mad',code:'MAD',name:'Madrid'},
    {id:'location-ca',code:'CA',name:'Centro América'},{id:'location-pan',code:'PAN',name:'Panamá'}]
};

@Injectable({providedIn:'root'})
export class CatalogMockService {
  private readonly base: string;
  constructor(private readonly http: HttpClient,@Inject(RUNTIME_CONFIG) runtime:RuntimeConfig){
    this.base=`${runtime.apiBasePath.replace(/\/$/,'')}/v1/exam-catalog`;
  }
  loadCatalogs():Observable<RequestCatalogs>{
    return this.http.get<CatalogPage>(this.base,{params:{active:true,page:0,size:100}}).pipe(
      switchMap(first=>{
        if(first.totalPages<=1)return of(first.content);
        const calls=Array.from({length:first.totalPages-1},(_,i)=>
          this.http.get<CatalogPage>(this.base,{params:{active:true,page:i+1,size:100}}));
        return forkJoin(calls).pipe(map(rest=>[first.content,...rest.map(page=>page.content)].flat()));
      }),
      map(rows=>{
        const exams:ExamCatalogItem[]=rows.map(row=>({
          id:row.id,code:row.examCode,name:row.examName,vendorId:row.vendor,vendorName:row.vendor,
          technologyId:row.courseName,technologyName:row.courseName,certificationId:'',certificationName:'',
          courseName:row.courseName,retake:row.retake??null,comments:row.comments??null,
          basePrice:String(row.baseCost),currency:row.baseCurrency,active:row.active
        }));
        const names=[...new Set(exams.map(exam=>exam.vendorName))].sort();
        return {...structuredClone(COMMERCIAL),vendors:names.map(name=>({id:name,code:name,name})),
          technologies:[],certifications:[],exams};
      })
    );
  }
}
