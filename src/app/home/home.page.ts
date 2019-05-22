import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'

import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  data: DatosY[] = [];

  dataSend: DatosX = { //para cargar datos fijos
    nombre: "Alan",
    edad: "34"
  }

  constructor( //fire es el nombre de la variable
    private fire: AngularFirestore,
    private http: HttpClient ){
      this.fire.collection<DatosX>("/personas/") //la conexion de la bd de firebase
      .valueChanges() //actualiza en cuanto cambia la bd o al reves
      .subscribe((data)=>{ //la data que recibimos

      });
    }

    save(){
      let idDoc = this.fire.createId();
      this.fire.doc("/personas/" + idDoc)
      .set(this.dataSend);
    }

    consulta(){
        this.http.get("https://swapi.co/api/people/")
        .subscribe((data)=>{

          console.log(data['results']);

        for (let i in data['results']) {
          let x: DatosY = {};
            x.name = data['results'][i].name;
            x.mass = data['results'][i].mass;
            x.gender = data['results'][i].gender;

            this.data.push(x);
        }

        console.log("Users: ", data);
      });
    }
}

interface DatosY {
    name?: string;
    mass?: string;
    gender?: string;
}

interface DatosX {
    nombre?: string;
    edad?: string;
}
