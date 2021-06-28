import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUser } from '../../interfaces/RegisterUser';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  regiones:Array<any> = [
    {nombreRegion: "Arica y Parinacota", comunas: ["Arica", "Camarones", "Putre", "General Lagos"]},
    {nombreRegion: "Tarapacá", comunas: ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"]},
    {nombreRegion: "Antofagasta", comunas: ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollague", "San Pedro de Atacama", "Tocopilla", "María Elena"]},
    {nombreRegion: "Atacama", comunas: ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"]},
    {nombreRegion: "Coquimbo", comunas: ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"]},
    {nombreRegion: "Valparaíso", comunas: ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"]},
    {nombreRegion: "Región del Libertador Gral. Bernardo O’Higgins", comunas: ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"]},
    {nombreRegion: "Región del Maule", comunas: ["Talca", "ConsVtución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "ReVro", "San Javier", "Villa Alegre", "Yerbas Buenas"]},
    {nombreRegion: "Región del Biobío", comunas: ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío", "Chillán", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "Chillán Viejo", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"]},
    {nombreRegion: "Región de la Araucanía", comunas: ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"]},
    {nombreRegion: "Región de Los Ríos" , comunas:["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"]},
    {nombreRegion:  "Región de Los Lagos" , comunas: ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"]},
    {nombreRegion: "Región Aisén del Gral. Carlos Ibáñez del Campo" , comunas: ["Coihaique", "Lago Verde", "Aisén", "Cisnes", "Guaitecas", "Cochrane", "O’Higgins", "Tortel", "Chile Chico", "Río Ibáñez"]},
    {nombreRegion: "Región de Magallanes y de la Antártica Chilena" , comunas: ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos (Ex Navarino)", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]},
    {nombreRegion: "Región Metropolitana de Santiago" , comunas: ["Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"]},
  ];

  comunas: Array<any> = [];

  cambiarRegion(region: any) {
		this.comunas = this.regiones.find((reg: any) => reg.nombreRegion == region.target.value).comunas;
	}

  // INPUTS
  inputFirstname:string = "";
  inputLastname:string = "";
  inputEmail:string = "";
  inputPassword:string = "";
  inputConfirmPassword:string = "";
  inputIdcard:string = "";
  inputAddress:string = "";
  inputRegion:string = "";
  inputCommune:string = "";
  inputRecaptcha:string = "";
  formulario:FormGroup;


  constructor(public fb:FormBuilder, public service:UsersService, private router: Router) {
    this.formulario = fb.group({
      inputFirstname:new FormControl(''),
      inputLastname:new FormControl(''),
      inputEmail:new FormControl(''),
      inputPassword:new FormControl(''),
      inputConfirmPassword:new FormControl(''),
      inputIdcard:new FormControl(''),
      inputAddress:new FormControl(''),
      inputRegion:new FormControl(''),
      inputCommune:new FormControl(''),
      inputRecaptcha:new FormControl('')
    });
  }

  ngOnInit(): void {
    let token = localStorage.getItem('accessToken');
    if (token){
      this.router.navigate([`/home`]);
    }
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved response token: ${captchaResponse}`);
  }

  onSubmit() {
    let validInput:boolean = false;
    let validPw:boolean = false;
    let user:RegisterUser = {
      firstname:this.formulario.controls['inputFirstname'].value,
      lastname:this.formulario.controls['inputLastname'].value,
      email:this.formulario.controls['inputEmail'].value,
      password:this.formulario.controls['inputPassword'].value,
      idcard:this.formulario.controls['inputIdcard'].value,
      residence_address:this.formulario.controls['inputAddress'].value,
      region:this.formulario.controls['inputRegion'].value,
      commune:this.formulario.controls['inputCommune'].value,
      recaptcha:this.formulario.controls['inputRecaptcha'].value
    };
    let confirmPassword = this.formulario.controls['inputConfirmPassword'].value;

    // VALIDACION INPUTS VACIOS
    if (user.firstname != "" && user.lastname != "" && user.email != "" && user.password != "" && user.idcard != "" && user.residence_address != "" && user.region != "" && user.commune != "" && confirmPassword != "") {
      validInput = true;
    }

    // VALIDACION CONFIRMAR CONTRASEÑA
    if (user.password == confirmPassword) {
      validPw = true;
    }

    if (validInput == true && validPw == true) {
      this.service.addUser(user);
    }
    else if (validInput == true && validPw == false) {
      alert("Las contraseñas no coinciden");
      console.log("Contraseñas no coinciden");
    }
    else {
      alert("Debe llenar todos los campos para registrarse");
      console.log("Campos obligatorios sin completar");
    }
  }

}
