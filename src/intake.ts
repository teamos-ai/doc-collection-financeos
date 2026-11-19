export type Applicant={id:string;name:string;email:string;mobile:string;income:string[];salaryMatch:boolean;entity:string};
export type Liability={id:string;applicant:string;label:string;type:'Home loan'|'Credit card';treatment:'Retained'|'Refinance'|'Consolidated'};
export type Intake={loan:string;broker:string;purposes:string[];propertyUse:string;contractAvailable:boolean;savings:boolean;applicants:Applicant[];liabilities:Liability[]};
export type RequestPreview={id:string;key:string;subject:string;title:string;period:string;basis:'Confirmed'|'Proposed';reason:string};
export const initialIntake:Intake={loan:'Example loan',broker:'Assigned broker',purposes:['Refinance'],propertyUse:'Owner occupied',contractAvailable:false,savings:false,applicants:[{id:'applicant-a',name:'Applicant A',email:'',mobile:'',income:['PAYG — permanent'],salaryMatch:false,entity:''}],liabilities:[{id:'account-a',applicant:'applicant-a',label:'Home loan A',type:'Home loan',treatment:'Refinance'},{id:'account-b',applicant:'applicant-a',label:'Card A',type:'Credit card',treatment:'Consolidated'},{id:'account-c',applicant:'applicant-a',label:'Card B',type:'Credit card',treatment:'Retained'}]};
export const incomeOptions=['PAYG — permanent','PAYG — casual','Sole trader','Company income','Partnership income','Trust income','Rental income'];
export function previewRequests(f:Intake):RequestPreview[]{
 const rows:RequestPreview[]=[];
 const add=(id:string,key:string,subject:string,title:string,period:string,basis:RequestPreview['basis'],reason:string)=>rows.push({id,key,subject,title,period,basis,reason});
 for(const a of f.applicants){
  const subject=a.name||a.id;const entity=a.entity||subject;
  add(a.id+'-id','driver-licence',subject,'Driver licence','Current ID · identity combination to confirm','Proposed','Identity evidence selected for this applicant; passport is an alternative in the catalogue.');
  const payg=a.income.some(x=>x.startsWith('PAYG'));const casual=a.income.includes('PAYG — casual');
  if(payg)add(a.id+'-payslips','payslips',subject,'Payslips','2 latest consecutive · latest within 30 days','Proposed','PAYG income relied upon. Ordinary pay-cycle starting standard.');
  if(casual)add(a.id+'-ato','ato-income',subject,'ATO income statement','Supplement to establish 6 months earnings','Proposed','Casual income history; broker checks whether payslip YTD already establishes it.');
  if(payg&&a.salaryMatch)add(a.id+'-salary','salary-statements',subject,'Salary bank statements',casual?'6 continuous months':'3 continuous months','Proposed','Only to match payslip net payments to salary credits.');
  if(a.income.some(x=>['Sole trader','Company income','Partnership income','Trust income'].includes(x))){
   add(a.id+'-tax','personal-tax-return',subject,'Personal tax returns','2 latest lodged financial years','Proposed','Standard self-employed initial pack; streamlined lender alternatives need review.');
   add(a.id+'-noa','notice-of-assessment',subject,'ATO notices of assessment','2 latest lodged financial years','Proposed','Personal assessment evidence for the selected income route.');
  }
  if(a.income.includes('Company income'))add(a.id+'-company','business-tax-return',entity,'Business tax returns','2 latest lodged financial years','Proposed','Company profits pathway. Removed standalone financials remain a broker-handled exception.');
  if(a.income.includes('Partnership income'))add(a.id+'-partnership','partnership-financials',entity,'Partnership tax returns and financials','2 latest relevant financial years','Proposed','Retained bundled partnership catalogue item.');
  if(a.income.includes('Trust income')){
   add(a.id+'-trust','trust-financials',entity,'Trust tax returns and financials','2 latest relevant financial years','Proposed','Retained bundled trust catalogue item.');
   add(a.id+'-deed','trust-deed',entity,'Trust deed','Current deed','Proposed','Confirm trust role and applicable amendments; no restoration of excluded trustee evidence.');
   add(a.id+'-amendments','trust-amendments',entity,'Trust deed amendments','All applicable amendments','Proposed','Broker unticks when there are no amendments.');
  }
  if(a.income.includes('Rental income'))add(a.id+'-rent','rental-statements',subject,'Rental statements','Latest statement · lease is an alternative','Proposed','Existing rental income relied upon. Do not request both alternatives by default.');
 }
 for(const l of f.liabilities){const a=f.applicants.find(x=>x.id===l.applicant);if(!a)continue;const subject=`${a.name||a.id} · ${l.label||l.id}`;
 if(l.type==='Credit card')add(l.id,'credit-card-statements',subject,'Credit-card statements',l.treatment==='Consolidated'?'6 continuous months':'3 continuous months','Confirmed',l.treatment==='Consolidated'?'This card is consolidated into the home loan.':'This card is retained and its conduct checked.');
 else add(l.id,'home-loan-statements',subject,'Home-loan statements',l.treatment==='Refinance'?'6 continuous months':'Latest statement showing repayment details',l.treatment==='Refinance'?'Confirmed':'Proposed',l.treatment==='Refinance'?'This existing home loan is being refinanced.':'This home loan is retained as an existing liability.');
 }
 if(f.purposes.includes('Purchase')&&f.contractAvailable)add('loan-contract','purchase-contract','Loan','Contract of sale — buying','Complete signed current contract','Proposed','Purchase has reached the contract stage.');
 if(f.savings)add('loan-savings','savings-statements','Deposit account','Savings statements','3 continuous months','Proposed','Savings support the deposit. Account/ownership must be resolved before issue.');
 if(f.purposes.includes('Construction'))for(const [key,title]of[['building-contract','Building contract'],['building-plans','Building plans'],['building-specifications','Building specifications'],['building-approvals','Building approvals']])add('loan-'+key,key,'Construction project',title,'Current project version','Proposed','Construction application; later invoices/inspections wait for the appropriate stage.');
 return rows;
}
