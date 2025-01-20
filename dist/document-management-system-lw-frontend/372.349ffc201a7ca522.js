"use strict";(self.webpackChunkdocument_management_system_lw_frontend=self.webpackChunkdocument_management_system_lw_frontend||[]).push([[372],{1372:(nt,y,s)=>{s.r(y),s.d(y,{UserManagemntRoutes:()=>it});var c=s(9159),m=s(5505),F=s(1626),e=s(3953),U=s(7843);let u=(()=>{class a{constructor(t){this.apiService=t}getOneUser(t){return this.apiService.get(`/users/${t}`)}getAllUsers(t){return this.apiService.get("/users")}getAllUsersWithServerSidePagination(t,r,o,l){const b=(new F.Nl).set("page",t.toString()).set("limit",r.toString()).set("sortBy",o).set("order",l);return this.apiService.get("/users",b)}loginUser(t,r){return this.apiService.post("/auth/login",t,r)}passwordResetOtp(t,r){return this.apiService.post("/auth/forget-password-otp",t,r)}passwordReset(t,r){return this.apiService.post("/auth/password-reset",t,r)}verifyOtp(t,r){return this.apiService.post("/auth/verify-otp",t,r)}resendOtp(t,r){return this.apiService.post("/auth/resend-otp",t,r)}createNewUser(t,r){return this.apiService.post("/auth/direct-user-register",t,r)}updateUser(t,r,o){return this.apiService.put(`/users/${r}`,t,o)}static{this.\u0275fac=function(r){return new(r||a)(e.KVO(U.Z))}}static{this.\u0275prov=e.jDH({token:a,factory:a.\u0275fac})}}return a})();var p=s(177),d=s(5596),I=s(7722),v=s(9213),D=s(9115),_=s(8834),R=s(6695),A=s(450),E=s(4912),j=s(2529),h=s(2168),w=s(2042),G=s(9172),$=s(5558),L=s(6354),M=s(9437),k=s(7224),Y=s(6471),V=s(6633),N=s(8149),C=s(7418),O=s(4006),f=s(2102),P=s(9631),S=s(4823);const X=()=>[5,10,25,100],B=()=>["/user-managemnt/user-profile"];function J(a,i){1&a&&(e.j41(0,"span",11),e.nrm(1,"app-content-loader",12),e.k0s()),2&a&&(e.R7$(),e.Y8G("loaderType","input"))}function z(a,i){if(1&a){const t=e.RV6();e.j41(0,"mat-form-field",11)(1,"input",13),e.bIt("keyup",function(o){e.eBV(t);const l=e.XpG();return e.Njj(l.applyFilter(o))}),e.k0s()()}}function H(a,i){1&a&&(e.j41(0,"button",14),e.nrm(1,"i-tabler",15),e.k0s()),2&a&&e.Y8G("routerLink",e.lJ4(1,B))}function K(a,i){1&a&&e.nrm(0,"app-content-loader",12),2&a&&e.Y8G("loaderType","button")}function W(a,i){1&a&&(e.j41(0,"th",28),e.EFF(1," Name "),e.k0s())}function Z(a,i){if(1&a&&(e.j41(0,"td",29)(1,"div",30)(2,"button",31),e.nrm(3,"img",32),e.k0s(),e.j41(4,"div",33)(5,"h6",34),e.EFF(6),e.k0s(),e.j41(7,"span",35),e.EFF(8),e.k0s()()()()),2&a){const t=i.$implicit;e.R7$(3),e.Y8G("src",t.profile_image,e.B4B),e.R7$(3),e.SpI(" ",t.name," "),e.R7$(2),e.SpI(" ",t.email," ")}}function Q(a,i){1&a&&(e.j41(0,"th",28),e.EFF(1," Role "),e.k0s())}function q(a,i){if(1&a&&(e.j41(0,"span",37),e.EFF(1),e.nI1(2,"titlecase"),e.k0s(),e.j41(3,"span",38),e.EFF(4," Full Access "),e.k0s()),2&a){const t=e.XpG().$implicit;e.R7$(),e.SpI(" ",e.bMT(2,1,t.role)," ")}}function ee(a,i){1&a&&(e.j41(0,"span",37),e.EFF(1),e.nI1(2,"titlecase"),e.k0s(),e.j41(3,"span",39),e.EFF(4," Read Access "),e.k0s()),2&a&&(e.R7$(),e.SpI(" ",e.bMT(2,1,"sub admin")," "))}function te(a,i){if(1&a&&(e.j41(0,"span",40),e.EFF(1),e.nI1(2,"titlecase"),e.k0s(),e.j41(3,"span",41),e.EFF(4," Download "),e.k0s()),2&a){const t=e.XpG().$implicit;e.R7$(),e.SpI(" ",e.bMT(2,1,t.role)," ")}}function ae(a,i){if(1&a&&(e.j41(0,"td",36),e.DNE(1,q,5,3)(2,ee,5,3)(3,te,5,3),e.k0s()),2&a){const t=i.$implicit;e.R7$(),e.vxM("ADMIN"==t.role?1:-1),e.R7$(),e.vxM("SUB_ADMIN"==t.role?2:-1),e.R7$(),e.vxM("USER"==t.role?3:-1)}}function re(a,i){1&a&&(e.j41(0,"th",28),e.EFF(1," Status "),e.k0s())}function ie(a,i){1&a&&(e.j41(0,"mat-label",42),e.EFF(1,"ACTIVE"),e.k0s())}function oe(a,i){1&a&&(e.j41(0,"mat-label",43),e.EFF(1,"DEACTIVETED"),e.k0s())}function ne(a,i){1&a&&(e.j41(0,"mat-icon",44),e.EFF(1,"admin_panel_settings"),e.k0s())}function se(a,i){1&a&&(e.j41(0,"mat-icon",45),e.EFF(1,"app_blocking"),e.k0s())}function le(a,i){if(1&a&&(e.j41(0,"td",36),e.DNE(1,ie,2,0,"mat-label",42)(2,oe,2,0,"mat-label",43)(3,ne,2,0,"mat-icon",44)(4,se,2,0,"mat-icon",45),e.k0s()),2&a){const t=i.$implicit;e.R7$(),e.vxM("ACTIVE"==t.status?1:-1),e.R7$(),e.vxM("DEACTIVE"==t.status?2:-1),e.R7$(),e.vxM("ADMIN_VERIFICATION_PENDING"==t.status?3:-1),e.R7$(),e.vxM("REGISTRATION_OTP_VERIFICATION_PENDING"==t.status?4:-1)}}function me(a,i){1&a&&(e.j41(0,"th",28),e.EFF(1," Created Date "),e.k0s())}function ce(a,i){if(1&a&&(e.j41(0,"td",46),e.EFF(1),e.k0s()),2&a){const t=i.$implicit;e.R7$(),e.SpI(" ",t.createdAt," ")}}function de(a,i){1&a&&(e.j41(0,"th",28),e.EFF(1,"Action"),e.k0s())}function fe(a,i){if(1&a){const t=e.RV6();e.j41(0,"td",29)(1,"a",47),e.bIt("click",function(){const o=e.eBV(t).$implicit,l=e.XpG(2);return e.Njj(l.navigateToEdit(o))}),e.nrm(2,"i-tabler",48),e.k0s(),e.j41(3,"a",49)(4,"i-tabler",50),e.bIt("click",function(){const o=e.eBV(t).$implicit,l=e.XpG(2);return e.Njj(l.openDialog("100ms","100ms",o))}),e.k0s()()()}}function pe(a,i){1&a&&e.nrm(0,"tr",51)}function ue(a,i){1&a&&e.nrm(0,"tr",52)}function _e(a,i){if(1&a&&(e.j41(0,"table",16),e.qex(1,17),e.DNE(2,W,2,0,"th",18)(3,Z,9,3,"td",19),e.bVm(),e.qex(4,20),e.DNE(5,Q,2,0,"th",18)(6,ae,4,3,"td",21),e.bVm(),e.qex(7,22),e.DNE(8,re,2,0,"th",18)(9,le,5,4,"td",21),e.bVm(),e.qex(10,23),e.DNE(11,me,2,0,"th",18)(12,ce,2,1,"td",24),e.bVm(),e.qex(13,25),e.DNE(14,de,2,0,"th",18)(15,fe,5,0,"td",19),e.bVm(),e.DNE(16,pe,1,0,"tr",26)(17,ue,1,0,"tr",27),e.k0s()),2&a){const t=e.XpG();e.Y8G("dataSource",t.dataSource),e.R7$(16),e.Y8G("matHeaderRowDef",t.displayedColumns),e.R7$(),e.Y8G("matRowDefColumns",t.displayedColumns)}}function he(a,i){1&a&&e.nrm(0,"app-content-loader",53),2&a&&e.Y8G("loaderType","table")}function ge(a,i){1&a&&e.nrm(0,"app-content-loader",12),2&a&&e.Y8G("loaderType","paginator")}let be=(()=>{class a{constructor(t,r,o,l){this.router=t,this.apiService=r,this.alertService=o,this.deleteConfirmDialog=l,this.displayedColumns=[],this.removeDialogTitle="Do you want to remove?",this.messageBodayKey="",this.editRouterLink="",this.tableData=[],this.dataSource=new c.I6,this.resultsLength=0,this.isLoadingResults=!0,this.isLoading=!0,this.isRateLimitReached=!1,this.pageSize=5}ngAfterViewInit(){this.dataSource.paginator=this.paginator,this.sort&&(this.dataSource.sort=this.sort),this.paginator.page.pipe((0,G.Z)({}),(0,$.n)(()=>(this.isLoadingResults=!0,this.requestTableData(this.sort?this.sort.active:"user_id",this.sort?this.sort.direction:"asc")))).subscribe(t=>{this.isLoadingResults=!1,this.tableData=t,this.isLoading=!1,this.dataSource=new c.I6(this.tableData)})}isBackDisabled(){return 0===this.paginator.pageIndex}isNextDisabled(){return this.paginator.pageIndex===Math.ceil(this.resultsLength/this.paginator.pageSize)-1}requestTableData(t,r){return this.apiService.getAllUsersWithServerSidePagination(this.paginator.pageIndex,this.paginator.pageSize,t,r).pipe((0,L.T)(o=>(this.resultsLength=o.total,o.data)),(0,M.W)(()=>(this.isLoadingResults=!1,this.isRateLimitReached=!0,[])))}onPageChange(){this.isLoadingResults=!0,this.requestTableData(this.sort?this.sort.active:"user_id",this.sort?this.sort.direction:"asc").subscribe(o=>{this.isLoadingResults=!1,this.resultsLength=o.total,this.dataSource.data=o.data})}applyFilter(t){this.dataSource.filter=t.target.value.trim().toLowerCase()}openDialog(t,r,o){this.deleteConfirmDialog.open(V.P,{width:"20%",enterAnimationDuration:t,exitAnimationDuration:r,data:{item:o[this.messageBodayKey],title:this.removeDialogTitle}})}navigateToEdit(t){console.log(t),this.router.navigate(["/user-managemnt/user-profile"],{queryParams:{id:t.user_id}})}onToggle(t){t.preventDefault(),console.log("Toggle"),t.source.checked=!0}static{this.\u0275fac=function(r){return new(r||a)(e.rXU(h.Ix),e.rXU(u),e.rXU(C.I),e.rXU(O.bZ))}}static{this.\u0275cmp=e.VBU({type:a,selectors:[["app-table-pagination"]],viewQuery:function(r,o){if(1&r&&(e.GBs(R.iy,5),e.GBs(w.B4,5)),2&r){let l;e.mGM(l=e.lsd())&&(o.paginator=l.first),e.mGM(l=e.lsd())&&(o.sort=l.first)}},inputs:{displayedColumns:"displayedColumns",removeDialogTitle:"removeDialogTitle",messageBodayKey:"messageBodayKey",editRouterLink:"editRouterLink"},standalone:!0,features:[e.Jv_([u]),e.aNF],decls:14,vars:13,consts:[[1,"cardWithShadow"],[1,"row","justify-content-between","m-l-4","m-r-4"],[1,"col-left"],["appearance","outline","class","w-100 m-b-0","color","primary",4,"ngIf"],[1,"col-right","m-r-30","m-t-2"],["color","primary","mat-stroked-button","",3,"routerLink",4,"ngIf"],[3,"loaderType",4,"ngIf"],[1,"table-responsive"],["mat-table","","class","w-100",3,"dataSource",4,"ngIf"],["style","padding-top: 2px !important;",3,"loaderType",4,"ngIf"],[3,"page","length","pageSize","pageSizeOptions"],["appearance","outline","color","primary",1,"w-100","m-b-0"],[3,"loaderType"],["matInput","","placeholder","Filter",3,"keyup"],["color","primary","mat-stroked-button","",3,"routerLink"],["name","user-plus",1,"icon-22",2,"color","blue"],["mat-table","",1,"w-100",3,"dataSource"],["matColumnDef","name"],["mat-header-cell","","class","f-w-600 mat-subtitle-1 f-s-14",4,"matHeaderCellDef"],["mat-cell","","class","mat-body-1",4,"matCellDef"],["matColumnDef","role"],["mat-cell","",4,"matCellDef"],["matColumnDef","status"],["matColumnDef","created_date"],["mat-cell","","class","mat-body-1 f-s-12 f-w-600",4,"matCellDef"],["matColumnDef","action"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["mat-header-cell","",1,"f-w-600","mat-subtitle-1","f-s-14"],["mat-cell","",1,"mat-body-1"],[1,"d-flex","align-items-center"],["mat-fab","","extended","","color","inherit","aria-label","Notifications",1,"d-flex","justify-content-center","profile-btn-dd"],["width","35",1,"rounded-circle","object-cover","icon-35","profile-dd",3,"src"],[1,"m-l-16"],[1,"mat-subtitle-1","f-s-14","f-w-600"],[1,"mat-body-1","f-s-12"],["mat-cell",""],[1,"bg-light-error","text-error","rounded","f-w-600","p-6","p-y-4","f-s-12","m-r-2"],[1,"bg-light-success","text-success","rounded","f-w-600","p-6","p-y-4","f-s-12"],[1,"bg-light-warning","text-warning","rounded","f-w-600","p-6","p-y-4","f-s-12"],[1,"bg-light-warning","text-warning","rounded","f-w-600","p-6","p-y-4","f-s-12","m-r-2"],[1,"bg-light-primary","text-primary","rounded","f-w-600","p-6","p-y-4","f-s-12"],[1,"label-active"],[1,"label-deactivated"],["matTooltip","Admin verification pending",1,"vibrate","admin-verification-pending"],["matTooltip","OTP Verification pending",1,"otp-verification-pending"],["mat-cell","",1,"mat-body-1","f-s-12","f-w-600"],[1,"m-r-10","cursor-pointer",3,"click"],["name","edit",1,"icon-22"],[1,"m-r-10","cursor-pointer"],["name","trash",1,"icon-22","outline-red",3,"click"],["mat-header-row",""],["mat-row",""],[2,"padding-top","2px !important",3,"loaderType"]],template:function(r,o){1&r&&(e.j41(0,"mat-card",0)(1,"mat-card-content")(2,"div",1)(3,"div",2),e.DNE(4,J,2,1,"span",3)(5,z,2,0,"mat-form-field",3),e.k0s(),e.j41(6,"div",4),e.DNE(7,H,2,2,"button",5)(8,K,1,1,"app-content-loader",6),e.k0s()(),e.j41(9,"div",7),e.DNE(10,_e,18,3,"table",8)(11,he,1,1,"app-content-loader",9)(12,ge,1,1,"app-content-loader",6),e.k0s(),e.j41(13,"mat-paginator",10),e.bIt("page",function(){return o.onPageChange()}),e.k0s()()()),2&r&&(e.R7$(4),e.Y8G("ngIf",o.isLoading),e.R7$(),e.Y8G("ngIf",!o.isLoading),e.R7$(2),e.Y8G("ngIf",!o.isLoading),e.R7$(),e.Y8G("ngIf",o.isLoading),e.R7$(2),e.Y8G("ngIf",!o.isLoading),e.R7$(),e.Y8G("ngIf",o.isLoading),e.R7$(),e.Y8G("ngIf",o.isLoading),e.R7$(),e.xc7("visibility",o.isLoading?"hidden":"visible"),e.Y8G("length",o.resultsLength)("pageSize",o.pageSize)("pageSizeOptions",e.lJ4(12,X)))},dependencies:[c.tP,c.Zl,c.tL,c.ji,c.cC,c.YV,c.iL,c.KS,c.$R,c.YZ,c.NB,p.MD,p.bT,p.PV,d.Hu,d.RN,d.m2,I.G,f.rl,f.nJ,P.fg,_.$z,_.Sr,v.An,S.oV,R.iy,v.m_,D.Cn,_.Hl,A.mV,E.X4,E.Jc,j.Ph,h.iI,h.Wk,w.NQ,k.y,Y.YN,N.G],styles:["th[_ngcontent-%COMP%]{padding-left:.7rem!important}.outline-red[_ngcontent-%COMP%]{color:red}.mat-mdc-card-header-text[_ngcontent-%COMP%]{display:contents!important}.admin-verification-pending[_ngcontent-%COMP%]{color:#e42626}.otp-verification-pending[_ngcontent-%COMP%]{color:#ffa31efc}@keyframes _ngcontent-%COMP%_vibrate{0%{transform:translate(0)}20%{transform:translate(-2px)}to{transform:translate(0)}}.mat-icon.vibrate[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_vibrate .5s ease-in-out 3!important;animation-delay:1s!important}.label-active[_ngcontent-%COMP%]{border-style:solid;border-width:1.5px;font-weight:600;padding:3px;font-size:small;color:#098b12}.label-deactivated[_ngcontent-%COMP%]{border-style:solid;border-width:1.5px;font-weight:600;padding:3px;font-size:small;color:#a119}"]})}}return a})(),ve=(()=>{class a{constructor(){this.dataSource=new c.I6,this.tableData=[],this.displayedColumns=["name","role","status","created_date","action"]}ngOnInit(){this.tableData=[{user_id:"1",name:"Dilupa Marasinghe",email:"test@gmail.com",role:m.N.ADMIN,status:m.z.ACTIVE,created_date:"202-10-27",profile_image:"assets/images/profile/user-1.jpg",mobileNumber:"+94712390348"},{user_id:"2",name:"Asith siriwardhana",email:"test@gmail.com",role:m.N.USER,status:m.z.ACTIVE,created_date:"202-10-27",profile_image:"assets/images/profile/user-2.jpg",mobileNumber:"+94712390348"},{user_id:"3",name:"Kasun janaka",email:"test@gmail.com",role:m.N.USER,status:m.z.ADMIN_VERIFICATION_PENDING,created_date:"202-10-27",profile_image:"assets/images/profile/user-3.jpg",mobileNumber:"+94712390348"},{user_id:"4",name:"Herath P.L.G",email:"test@gmail.com",role:m.N.USER,status:m.z.ACTIVE,created_date:"202-10-27",profile_image:"assets/images/profile/user-4.jpg",mobileNumber:"+94712390348"},{user_id:"5",name:"K.S.C.Janith",email:"test@gmail.com",role:m.N.USER,status:m.z.DEACTIVE,created_date:"202-10-27",profile_image:"assets/images/profile/user-5.jpg",mobileNumber:"+94712390348"},{user_id:"6",name:"Kamal Senath",email:"test@gmail.com",role:m.N.USER,status:m.z.ACTIVE,created_date:"202-10-27",profile_image:"assets/images/profile/user-6.jpg",mobileNumber:"+94712390348"},{user_id:"7",name:"Lal Guruge",email:"test@gmail.com",role:m.N.USER,status:m.z.ACTIVE,created_date:"202-10-27",profile_image:"assets/images/profile/user-7.jpg",mobileNumber:"+94712390348"},{user_id:"8",name:"Sahan H.L.R",email:"test@gmail.com",role:m.N.USER,status:m.z.ACTIVE,created_date:"202-10-27",profile_image:"assets/images/profile/user-8.jpg",mobileNumber:"+94712390348"}],this.dataSource=new c.I6(this.tableData)}static{this.\u0275fac=function(r){return new(r||a)}}static{this.\u0275cmp=e.VBU({type:a,selectors:[["app-users"]],standalone:!0,features:[e.Jv_([u]),e.aNF],decls:1,vars:4,consts:[[3,"displayedColumns","removeDialogTitle","messageBodayKey","editRouterLink"]],template:function(r,o){1&r&&e.nrm(0,"app-table-pagination",0),2&r&&e.Y8G("displayedColumns",o.displayedColumns)("removeDialogTitle","Remove this user")("messageBodayKey","name")("editRouterLink","/user-managemnt/user-profile")},dependencies:[be]})}}return a})();var n=s(9417),Ce=s(5951),x=s(2798),Pe=s(7780),g=s(2155),T=s(9088),Te=s(356),ye=s(4535),Ie=s(6600);const Re=(a,i)=>i.value,Ee=(a,i)=>({"bg-light-error text-error":a,"bg-light-warning text-warning":i});function we(a,i){1&a&&(e.j41(0,"mat-error"),e.EFF(1," Name is required. "),e.k0s())}function ke(a,i){1&a&&(e.j41(0,"mat-error"),e.EFF(1," Name must be at least 6 characters long. "),e.k0s())}function Ne(a,i){1&a&&(e.j41(0,"mat-error"),e.EFF(1," Name cannot exceed 50 characters. "),e.k0s())}function Se(a,i){1&a&&(e.j41(0,"mat-error"),e.EFF(1," Email is required. "),e.k0s())}function xe(a,i){1&a&&(e.j41(0,"mat-error"),e.EFF(1," Enter a valid email address. "),e.k0s())}function Fe(a,i){if(1&a&&(e.j41(0,"mat-label")(1,"span",25),e.EFF(2),e.nI1(3,"titlecase"),e.k0s()()),2&a){const t=e.XpG(2);e.R7$(),e.Y8G("ngClass",e.l_i(4,Ee,"ADMIN"===t.userData.role,"USER"===t.userData.role)),e.R7$(),e.SpI(" ",e.bMT(3,2,t.userData.role)," ")}}function Ue(a,i){if(1&a&&(e.j41(0,"mat-option",28),e.EFF(1),e.k0s()),2&a){const t=i.$implicit;e.Y8G("value",t.value),e.R7$(),e.JRh(t.viewValue)}}function De(a,i){1&a&&(e.j41(0,"mat-error"),e.EFF(1," Role is required. "),e.k0s())}function Ae(a,i){if(1&a){const t=e.RV6();e.j41(0,"mat-form-field",26)(1,"mat-select",27),e.mxI("valueChange",function(o){e.eBV(t);const l=e.XpG(2);return e.DH7(l.selectedRole,o)||(l.selectedRole=o),e.Njj(o)}),e.Z7z(2,Ue,2,2,"mat-option",28,Re),e.k0s(),e.DNE(4,De,2,0,"mat-error",16),e.k0s()}if(2&a){const t=e.XpG(2);e.R7$(),e.R50("value",t.selectedRole),e.R7$(),e.Dyx(t.role),e.R7$(2),e.Y8G("ngIf",t.f.role.hasError("required")&&(t.f.role.touched||t.f.role.dirty))}}function je(a,i){1&a&&(e.j41(0,"mat-error"),e.EFF(1," Mobile number is required. "),e.k0s())}function Ge(a,i){1&a&&(e.j41(0,"mat-error"),e.EFF(1," Enter a valid 9-digit mobile number. "),e.k0s())}function $e(a,i){1&a&&(e.j41(0,"mat-icon",34),e.EFF(1," error "),e.k0s())}function Le(a,i){1&a&&(e.j41(0,"mat-error"),e.EFF(1," Password is required. "),e.k0s())}function Me(a,i){1&a&&(e.j41(0,"mat-error"),e.EFF(1," Confirm Password is required. "),e.k0s())}function Ye(a,i){1&a&&(e.j41(0,"mat-error"),e.EFF(1," Passwords do not match. "),e.k0s())}function Ve(a,i){if(1&a){const t=e.RV6();e.j41(0,"div",12)(1,"mat-label",29),e.EFF(2,"Password"),e.k0s(),e.j41(3,"mat-form-field",14),e.nrm(4,"input",30),e.DNE(5,$e,2,0,"mat-icon",31),e.j41(6,"mat-icon",32),e.bIt("click",function(){e.eBV(t);const o=e.XpG(2);return e.Njj(o.showHidePassword())}),e.EFF(7),e.k0s(),e.DNE(8,Le,2,0,"mat-error",16),e.k0s(),e.j41(9,"mat-label",29),e.EFF(10,"Confirm Password"),e.k0s(),e.j41(11,"mat-form-field",14),e.nrm(12,"input",33),e.j41(13,"mat-icon",32),e.bIt("click",function(){e.eBV(t);const o=e.XpG(2);return e.Njj(o.showHideConfirmPassword())}),e.EFF(14),e.k0s(),e.DNE(15,Me,2,0,"mat-error",16)(16,Ye,2,0,"mat-error",16),e.k0s()()}if(2&a){const t=e.XpG(2);e.R7$(4),e.Y8G("type",t.hidePassword?"password":"text"),e.R7$(),e.Y8G("ngIf",t.f.new_password.invalid&&(t.f.new_password.touched||t.f.new_password.dirty)),e.R7$(2),e.JRh(t.hidePassword?"visibility_off":"visibility"),e.R7$(),e.Y8G("ngIf",t.f.new_password.hasError("required")&&(t.f.new_password.touched||t.f.new_password.dirty)),e.R7$(4),e.Y8G("type",t.hideConfirmPassword?"password":"text"),e.R7$(2),e.JRh(t.hideConfirmPassword?"visibility_off":"visibility"),e.R7$(),e.Y8G("ngIf",t.f.confirm_password.hasError("required")&&(t.f.confirm_password.touched||t.f.confirm_password.dirty)),e.R7$(),e.Y8G("ngIf",t.f.confirm_password.hasError("passwordsMismatch")&&(t.f.confirm_password.touched||t.f.confirm_password.dirty))}}function Oe(a,i){if(1&a&&(e.j41(0,"button",23),e.EFF(1,"Verify Account"),e.k0s()),2&a){const t=e.XpG(3);e.Y8G("disabled",t.isReadOnly)}}function Xe(a,i){if(1&a&&e.DNE(0,Oe,2,1,"button",35),2&a){const t=e.XpG(2);e.Y8G("ngIf",t.isAdmin&&t.isUserProfile)}}function Be(a,i){}function Je(a,i){if(1&a){const t=e.RV6();e.j41(0,"button",39),e.bIt("click",function(){e.eBV(t);const o=e.XpG(3);return e.Njj(o.clickCreateUser())}),e.EFF(1,"Create User"),e.k0s()}if(2&a){const t=e.XpG(3);e.Y8G("disabled",t.form.invalid||t.isReadOnly)}}function ze(a,i){if(1&a){const t=e.RV6();e.j41(0,"button",39),e.bIt("click",function(){e.eBV(t);const o=e.XpG(3);return e.Njj(o.clickUpdateUser())}),e.EFF(1,"Save Changes"),e.k0s()}if(2&a){const t=e.XpG(3);e.Y8G("disabled",t.form.invalid||t.isReadOnly)}}function He(a,i){if(1&a&&(e.j41(0,"button",40),e.EFF(1,"Clear"),e.k0s()),2&a){const t=e.XpG(3);e.Y8G("disabled",t.isReadOnly)}}function Ke(a,i){if(1&a){const t=e.RV6();e.j41(0,"button",41),e.bIt("click",function(){e.eBV(t);const o=e.XpG(3);return e.Njj(o.loadUserData())}),e.EFF(1,"Revert changes"),e.k0s()}if(2&a){const t=e.XpG(3);e.Y8G("disabled",t.isReadOnly)}}function We(a,i){if(1&a&&e.DNE(0,Je,2,1,"button",36)(1,ze,2,1,"button",36)(2,He,2,1,"button",37)(3,Ke,2,1,"button",38),2&a){const t=e.XpG(2);e.Y8G("ngIf",!t.isUserProfile),e.R7$(),e.Y8G("ngIf",t.isUserProfile),e.R7$(),e.Y8G("ngIf",!t.isUserProfile),e.R7$(),e.Y8G("ngIf",t.isUserProfile)}}function Ze(a,i){if(1&a&&(e.j41(0,"button",42),e.EFF(1,"Deactivate"),e.k0s()),2&a){const t=e.XpG(2);e.Y8G("disabled",t.isReadOnly)}}function Qe(a,i){if(1&a&&(e.j41(0,"mat-card",8)(1,"mat-card-header")(2,"mat-card-title",9),e.EFF(3),e.k0s()(),e.j41(4,"mat-card-content",10)(5,"form",11)(6,"div",0)(7,"div",12)(8,"mat-label",13),e.EFF(9,"Name"),e.k0s(),e.j41(10,"mat-form-field",14),e.nrm(11,"input",15),e.DNE(12,we,2,0,"mat-error",16)(13,ke,2,0,"mat-error",16)(14,Ne,2,0,"mat-error",16),e.k0s()(),e.j41(15,"div",12)(16,"mat-label",13),e.EFF(17,"Email"),e.k0s(),e.j41(18,"mat-form-field",14),e.nrm(19,"input",17),e.DNE(20,Se,2,0,"mat-error",16)(21,xe,2,0,"mat-error",16),e.k0s()(),e.j41(22,"div",12)(23,"mat-label",13),e.EFF(24,"Role"),e.k0s(),e.DNE(25,Fe,4,7,"mat-label",16)(26,Ae,5,2,"mat-form-field",18),e.k0s(),e.j41(27,"div",12)(28,"mat-label",13),e.EFF(29,"Mobile Number"),e.k0s(),e.j41(30,"mat-form-field",14)(31,"span",19),e.EFF(32,"+94 \xa0"),e.k0s(),e.nrm(33,"input",20),e.DNE(34,je,2,0,"mat-error",16)(35,Ge,2,0,"mat-error",16),e.k0s()(),e.DNE(36,Ve,17,8,"div",21),e.k0s(),e.j41(37,"div",22),e.DNE(38,Xe,1,1,"button",23)(39,Be,0,0)(40,We,4,4)(41,Ze,2,1,"button",24),e.k0s()()()()),2&a){const t=e.XpG();e.R7$(3),e.JRh(t.isUserProfile?"Profile":"Add New User"),e.R7$(2),e.Y8G("formGroup",t.form),e.R7$(7),e.Y8G("ngIf",t.f.name.hasError("required")&&(t.f.name.touched||t.f.name.dirty)),e.R7$(),e.Y8G("ngIf",t.f.name.hasError("minlength")&&(t.f.name.touched||t.f.name.dirty)),e.R7$(),e.Y8G("ngIf",t.f.name.hasError("maxlength")&&(t.f.name.touched||t.f.name.dirty)),e.R7$(6),e.Y8G("ngIf",t.f.email.hasError("required")&&(t.f.email.touched||t.f.email.dirty)),e.R7$(),e.Y8G("ngIf",t.f.email.hasError("email")&&(t.f.email.touched||t.f.email.dirty)),e.R7$(4),e.Y8G("ngIf",t.isUserProfile),e.R7$(),e.Y8G("ngIf",!t.isUserProfile),e.R7$(8),e.Y8G("ngIf",t.f.mobileNumber.hasError("required")&&(t.f.mobileNumber.touched||t.f.mobileNumber.dirty)),e.R7$(),e.Y8G("ngIf",t.f.mobileNumber.hasError("pattern")&&(t.f.mobileNumber.touched||t.f.mobileNumber.dirty)),e.R7$(),e.Y8G("ngIf",!t.isUserProfile),e.R7$(2),e.vxM(t.isUserProfile&&"ADMIN_VERIFICATION_PENDING"===t.userData.status?38:t.isUserProfile&&"DEACTIVE"===t.userData.status?39:40),e.R7$(3),e.Y8G("ngIf",t.isAdmin&&t.isUserProfile)}}function qe(a,i){if(1&a&&(e.j41(0,"div",43)(1,"mat-card",2)(2,"mat-card-header")(3,"mat-card-title",9),e.EFF(4),e.k0s()(),e.j41(5,"mat-card-content",3),e.nrm(6,"app-content-loader",44),e.k0s()()()),2&a){const t=e.XpG();e.R7$(4),e.JRh(t.isUserProfile?"Profile":"Add New User"),e.R7$(2),e.Y8G("loaderType","form-card")}}let et=(()=>{class a{constructor(t,r,o,l,b){this.route=t,this.alertService=r,this.apiService=o,this.authService=l,this.fullPageLoaderService=b,this.isLoading=!0,this.userId="",this.isUserProfile=!1,this.isReadOnly=!1,this.isAdmin=!1,this.hideConfirmPassword=!0,this.hidePassword=!0,this.role=[{value:m.N.ADMIN,viewValue:"Admin"},{value:m.N.SUB_ADMIN,viewValue:"Sub Admin"},{value:m.N.USER,viewValue:"User"}],this.selectedRole=this.role[1].value,this.form=new n.gE({name:new n.MJ("",[n.k0.required,n.k0.minLength(3),n.k0.maxLength(50)]),role:new n.MJ("USER",[n.k0.required]),email:new n.MJ("",[n.k0.required,n.k0.email]),mobileNumber:new n.MJ("",[n.k0.required,n.k0.pattern(/^\d{9}$/)]),new_password:new n.MJ("",[n.k0.required,n.k0.minLength(8),n.k0.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z]).{8,}$/)]),confirm_password:new n.MJ("",[n.k0.required])},{validators:Pe.R.passwordMatchValidator})}ngOnInit(){this.isAdmin=this.authService.hasRole(m.N.ADMIN),this.route.queryParams.subscribe(t=>{t.id?(this.userId=t.id,this.loadUserData()):(this.fullPageLoaderService.setLoadingStatus(!1),this.isLoading=!1,this.isUserProfile=!1)})}get f(){return this.form.controls}clickCreateUser(){this.isReadOnly||this.alertService.confirmAlert("Are you sure?",`Do you want to create this user with role: ${this.form.value.role}?`,"warning",!0,"No",!0,"Yes, Proceed",!1,this.submit.bind(this))}submit(){this.form.invalid?console.error("Form is invalid"):(this.fullPageLoaderService.setLoadingStatus(!0),this.apiService.createNewUser({name:this.form.value.name,email:this.form.value.email,userRole:this.form.value.role,mobileNumber:`+94${this.form.value.mobileNumber}`,password:this.form.value.new_password}).subscribe({next:r=>{console.log("User creation successful:",r),this.alertService.successAlert("center","User creation success","",3e3)},error:r=>{this.fullPageLoaderService.setLoadingStatus(!1),console.error("Registration failed:",r),this.alertService.errorAlert("center","User creation failed",r.error.errorCode===g.C.ALREADY_EXIST||r.error.errorCode===g.C.ACCESSDENIED?r.error.message:"",3e3,!1,"",!1)},complete:()=>{this.fullPageLoaderService.setLoadingStatus(!1),console.log("Registration request completed.")}}))}clickUpdateUser(){this.isReadOnly||this.alertService.confirmAlert("Are you sure?","Do you want to save the changes?","warning",!0,"No",!0,"Yes, Proceed",!1,this.submitForUpdate.bind(this))}submitForUpdate(){this.form.invalid?console.error("Form is invalid"):(this.fullPageLoaderService.setLoadingStatus(!0),this.apiService.updateUser({name:this.form.value.name,email:this.form.value.email,mobileNumber:`+94${this.form.value.mobileNumber}`},this.userId).subscribe({next:r=>{console.log("User update successful:",r),this.alertService.successAlert("center","Profile has been successfully updated!","",3e3),this.loadUserData()},error:r=>{this.fullPageLoaderService.setLoadingStatus(!1),console.error("Registration failed:",r),this.alertService.errorAlert("center","We couldn't update profile",r.error.errorCode===g.C.ACCESSDENIED?r.error.message:"",3e3,!1,"",!1)},complete:()=>{this.fullPageLoaderService.setLoadingStatus(!1),console.log("Registration request completed.")}}))}loadUserData(){if(!this.userId)return this.fullPageLoaderService.setLoadingStatus(!1),this.isLoading=!1,this.isUserProfile=!1,void console.error("User Id is invalid");this.isUserProfile=!0,this.fullPageLoaderService.setLoadingStatus(!0),this.apiService.getOneUser(this.userId).subscribe({next:t=>{console.log("User fetching successful:",t),this.userData=t.data,this.userData.mobileNumber=this.userData.mobileNumber.replace("+94",""),this.reGenerateUserProfileFrom(this.userData.role),this.form.patchValue(this.userData),this.isReadOnly=!Te.q.hasProfileEditPermission(this.authService,this.userData),this.isReadOnly&&this.form.disable(),console.log("this.userData"),console.log(this.userData),console.log("this.userData"),this.isLoading=!1},error:t=>{this.fullPageLoaderService.setLoadingStatus(!1),console.error("User loading failed:",t),t.error.errorCode===g.C.NOT_FOUND?this.alertService.errorAlert("center","User not found",t.error.message,3e3,!1,"",!1):t.error.errorCode===g.C.ACCESSDENIED?this.alertService.errorAlert("center","You are not permitted to load other accounts",t.error.message,4e3,!1,"",!1):this.alertService.errorAlert("center","Error while loading profile data","",3e3,!1,"",!1)},complete:()=>{this.fullPageLoaderService.setLoadingStatus(!1),console.log("User loading request completed.")}})}showHideConfirmPassword(){this.hideConfirmPassword=!this.hideConfirmPassword}showHidePassword(){this.hidePassword=!this.hidePassword}reGenerateUserProfileFrom(t){t===m.N.ADMIN&&(this.form=new n.gE({name:new n.MJ("",[n.k0.required,n.k0.minLength(3),n.k0.maxLength(50)]),role:new n.MJ(t,[n.k0.required]),email:new n.MJ("",[n.k0.required,n.k0.email]),mobileNumber:new n.MJ("",[n.k0.required,n.k0.pattern(/^\d{9}$/)])})),this.form=new n.gE({name:new n.MJ("",[n.k0.required,n.k0.minLength(3),n.k0.maxLength(50)]),email:new n.MJ("",[n.k0.required,n.k0.email]),mobileNumber:new n.MJ("",[n.k0.required,n.k0.pattern(/^\d{9}$/)])})}static{this.\u0275fac=function(r){return new(r||a)(e.rXU(h.nX),e.rXU(C.I),e.rXU(u),e.rXU(T.u),e.rXU(ye.J))}}static{this.\u0275cmp=e.VBU({type:a,selectors:[["app-user-profile"]],standalone:!0,features:[e.Jv_([u,T.u]),e.aNF],decls:12,vars:2,consts:[[1,"row"],[1,"col"],[1,"mat-mdc-card","mdc-card","cardWithShadow"],[1,"mat-mdc-card-content","p-y-24"],[1,"mat-mdc-card-title"],[1,"mat-mdc-card-subtitle","mat-body-1"],["class","cardWithShadow theme-card",4,"ngIf"],["class","col-md-6",4,"ngIf"],[1,"cardWithShadow","theme-card"],[1,"m-b-0"],[1,"b-t-1"],[3,"formGroup"],[1,"col-lg-6"],[1,"f-w-600","m-b-8","d-block"],["appearance","outline","color","primary",1,"w-100"],["formControlName","name","matInput","","placeholder","Name "],[4,"ngIf"],["formControlName","email","matInput","","type","email","placeholder","Email"],["appearance","outline","class","w-50 m-l--16",4,"ngIf"],["matTextPrefix",""],["matInput","","formControlName","mobileNumber","type","tel","placeholder","71-222-2222"],["class","col-lg-6",4,"ngIf"],[1,"m-t-12"],["mat-stroked-button","","color","accent",1,"m-r-8","verify-button",3,"disabled"],["mat-flat-button","","color","warn",3,"disabled",4,"ngIf"],[1,"rounded","f-w-600","p-6","m-t-4","p-y-4","f-s-12","m-r-2",3,"ngClass"],["appearance","outline",1,"w-50","m-l--16"],["formControlName","role",3,"valueChange","value"],[3,"value"],[1,"mat-subtitle-2","f-s-14","f-w-600","m-b-12","d-block"],["matInput","","formControlName","new_password","placeholder","Enter your password",3,"type"],["matSuffix","","matTooltip","Password must be at least 8 characters long.\n        Password must include an uppercase letter, a number, and a minimum of 8 characters.\n        Confirm Password",4,"ngIf"],["matSuffix","",1,"show-hide-icon",3,"click"],["matInput","","formControlName","confirm_password","placeholder","Confirm your password",3,"type"],["matSuffix","","matTooltip","Password must be at least 8 characters long.\n        Password must include an uppercase letter, a number, and a minimum of 8 characters.\n        Confirm Password"],["class","m-r-8 verify-button","mat-stroked-button","","color","accent",3,"disabled",4,"ngIf"],["mat-flat-button","","color","primary","class","m-r-8",3,"disabled","click",4,"ngIf"],["mat-stroked-button","","color","warn",3,"disabled",4,"ngIf"],["class","m-r-8","mat-stroked-button","","color","warn",3,"disabled","click",4,"ngIf"],["mat-flat-button","","color","primary",1,"m-r-8",3,"click","disabled"],["mat-stroked-button","","color","warn",3,"disabled"],["mat-stroked-button","","color","warn",1,"m-r-8",3,"click","disabled"],["mat-flat-button","","color","warn",3,"disabled"],[1,"col-md-6"],[3,"loaderType"]],template:function(r,o){1&r&&(e.j41(0,"div",0)(1,"div",1)(2,"mat-card",2)(3,"mat-card-content",3)(4,"mat-card-title",4),e.EFF(5," Change Password "),e.k0s(),e.j41(6,"mat-card-subtitle",5),e.EFF(7," To change your password please confirm here "),e.k0s()()()()(),e.j41(8,"div",0)(9,"div",1),e.DNE(10,Qe,42,14,"mat-card",6),e.k0s(),e.DNE(11,qe,7,2,"div",7),e.k0s()),2&r&&(e.R7$(10),e.Y8G("ngIf",!o.isLoading),e.R7$(),e.Y8G("ngIf",o.isLoading))},dependencies:[p.MD,p.YU,p.bT,p.PV,f.RG,f.rl,f.nJ,f.TL,f.JW,f.yw,x.Ve,x.VO,Ie.wT,n.YN,n.qT,n.me,n.BC,n.cb,n.X1,n.j4,n.JD,Ce.Wk,_.Hl,_.$z,d.Hu,d.RN,d.m2,d.MM,d.Lc,d.dh,P.fS,P.fg,I.G,v.An,S.oV,k.y,N.G],styles:[".show-hide-icon[_ngcontent-%COMP%]{cursor:pointer;color:#a69f9f}.show-hide-icon[_ngcontent-%COMP%]:hover{color:#000}.verify-button[_ngcontent-%COMP%]{border-width:2px!important;color:#1618cd!important}.skeleton-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:16px;width:100%;padding:16px;background-color:#fff;border:1px solid #ddd;border-radius:8px}.skeleton-circle[_ngcontent-%COMP%]{height:50px;width:50px;border-radius:50%;background-color:#e0e0e0;animation:_ngcontent-%COMP%_pulse 1.5s infinite ease-in-out}.skeleton-line-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px}.skeleton-line[_ngcontent-%COMP%]{height:16px;width:80%;background-color:#e0e0e0;border-radius:4px;animation:_ngcontent-%COMP%_pulse 1.5s infinite ease-in-out}.skeleton-line.short[_ngcontent-%COMP%]{width:60%}.skeleton-rect[_ngcontent-%COMP%]{height:200px;width:100%;background-color:#e0e0e0;border-radius:8px;animation:_ngcontent-%COMP%_pulse 1.5s infinite ease-in-out}@keyframes _ngcontent-%COMP%_pulse{0%{opacity:1}50%{opacity:.5}to{opacity:1}}"]})}}return a})();var tt=s(2014),at=s(8866);const it=[{path:"",children:[{path:"users",component:ve,canActivate:[tt.K],data:{title:"Available Users",expectedRole:m.N.ADMIN}},{path:"user-profile",component:et,canActivate:[(()=>{class a{constructor(t,r,o){this.authService=t,this.router=r,this.sweetAlertService=o}canActivate(t){const r=t.queryParams.id,o=this.authService.getToken();if(!o)return this.router.navigate(["/login"]),!1;try{const l=(0,at.s)(o);return(l.role||"")===m.N.ADMIN||(r?r===(l.userId||"")||(this.sweetAlertService.errorToaster("top","Your are not permitted to load other accounts"),this.router.navigate(["/unauthorized"]),!1):(this.router.navigate(["/unauthorized"]),!1))}catch(l){return console.error("Invalid authToken:",l),this.sweetAlertService.errorToaster("top","Your are not permitted to load other accounts"),!1}}static{this.\u0275fac=function(r){return new(r||a)(e.KVO(T.u),e.KVO(h.Ix),e.KVO(C.I))}}static{this.\u0275prov=e.jDH({token:a,factory:a.\u0275fac,providedIn:"root"})}}return a})()],data:{title:"User Profile"}}]}]}}]);