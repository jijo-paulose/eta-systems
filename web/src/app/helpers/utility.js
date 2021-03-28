
import randomstring from "randomstring";
import { reactLocalStorage } from "reactjs-localstorage";



export function setVisitor() {
    reactLocalStorage.set("visitorkey", randomstring.generate());
}
export function getVisitor() {
    return reactLocalStorage.get("visitorkey");
}








