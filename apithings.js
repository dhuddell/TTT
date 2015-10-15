curl --request POST --header "Content-Type: application/json" -d '{
  "credentials": {
    "email": "daaan",
    "password": "abc123"
  }
}' http://ttt.wdibos.com/login

register: function register(credentials, callback){
  this.ajax({
  method: 'POST';
  url: this.ttt + '/users',
  contentType: 'application/json'; charset=utf-8'
  }, callback);
  })
}
