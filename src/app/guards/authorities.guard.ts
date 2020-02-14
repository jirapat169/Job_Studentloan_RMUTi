import { AppService } from "src/app/services/app.service";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthoritiesGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.service.localStorage.get("userlogin")) {
      let userlogin: any = this.service.localStorage.get("userlogin");
      if (userlogin.role == "2500") {
        return true;
      }
    }
    this.router.navigate(["/notfound"]);
    return true;
  }
  constructor(private service: AppService, private router: Router) {}
}
