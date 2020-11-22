export class helpers {
    static PushToken(token){
        localStorage.setItem('token', token);
    }

    static DeleteToken(){
        localStorage.removeItem('token');
    }

    static GetToken(){
        var tryToken = localStorage.getItem('token')
        if(tryToken == null){
            return null
        }
        return localStorage.getItem('token').toString()
    }

    static PushUsername(username){
        localStorage.setItem('username', username);
    }

    static DeleteUsername(){
        localStorage.removeItem('username');
    }

    static GetUsername(){
        var tryToken = localStorage.getItem('username')
        if(tryToken == null){
            return null
        }
        return localStorage.getItem('username').toString()
    }

    static IsLoggedIn(){
        if(helper.GetToken() == null){
          return false
        }
        return true
      }
 }