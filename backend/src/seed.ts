import { AppDataSource } from "./data-source"
import { User } from "./entities/User"
import { Review } from "./entities/Review"
import { Role } from "./entities/Role"

const reviewComments = [
    { rating: 5, comment: "Excelente trabajo, muy profesional y puntual. Lo recomiendo totalmente." },
    { rating: 5, comment: "Resolvió el problema rápido y a buen precio. Volvería a contratarlo." },
    { rating: 4, comment: "Buen trabajo, cumplió con lo acordado. Muy amable y ordenado." },
    { rating: 5, comment: "Muy buena atención y calidad de trabajo. Quedé muy conforme." },
    { rating: 4, comment: "Llegó a horario, explicó bien lo que hizo y el precio fue justo." },
    { rating: 3, comment: "El trabajo quedó bien pero tardó más de lo esperado." },
    { rating: 5, comment: "Profesional de confianza. Ya lo llamé varias veces y siempre excelente." },
    { rating: 4, comment: "Buen servicio, resolvió el problema sin inconvenientes." },
    { rating: 5, comment: "Muy prolijo y eficiente. Dejó todo limpio al terminar." },
    { rating: 4, comment: "Muy bien, cumplió en tiempo y forma. Lo recomiendo." },
]

const reviewClients = [
    "Laura Martinez", "Sofia Rodriguez", "Diego Fernandez", "Valentina Gomez",
    "Facundo Lopez", "Camila Torres", "Matias Sanchez", "Florencia Perez",
    "Agustin Diaz", "Micaela Ruiz"
]

const clients = [
    { firstName: "Laura",     lastName: "Martinez",  age: 25, phoneNumber: 2615551234, email: "laura@test.com",     password: "cliente123", address: "Godoy Cruz, Mendoza", birthDate: new Date("1999-03-15"), dni: 45123456, userName: "lmartinez" },
    { firstName: "Sofia",     lastName: "Rodriguez", age: 30, phoneNumber: 2615552345, email: "sofia@test.com",     password: "cliente123", address: "Capital, Mendoza",    birthDate: new Date("1994-07-22"), dni: 38234567, userName: "srodriguez" },
    { firstName: "Diego",     lastName: "Fernandez", age: 28, phoneNumber: 2615553456, email: "diego@test.com",     password: "cliente123", address: "Maipu, Mendoza",      birthDate: new Date("1996-11-10"), dni: 41345678, userName: "dfernandez" },
    { firstName: "Valentina", lastName: "Gomez",     age: 22, phoneNumber: 2615554567, email: "valentina@test.com", password: "cliente123", address: "Lujan, Mendoza",      birthDate: new Date("2002-04-05"), dni: 47456789, userName: "vgomez" },
    { firstName: "Facundo",   lastName: "Lopez",     age: 33, phoneNumber: 2615555678, email: "facundo@test.com",   password: "cliente123", address: "Las Heras, Mendoza",  birthDate: new Date("1991-09-18"), dni: 36567890, userName: "flopez" },
    { firstName: "Camila",    lastName: "Torres",    age: 27, phoneNumber: 2615556789, email: "camila@test.com",    password: "cliente123", address: "Guaymallen, Mendoza", birthDate: new Date("1997-12-30"), dni: 43678901, userName: "ctorres" },
    { firstName: "Matias",    lastName: "Sanchez",   age: 31, phoneNumber: 2615557890, email: "matias@test.com",    password: "cliente123", address: "San Martin, Mendoza", birthDate: new Date("1993-06-14"), dni: 37789012, userName: "msanchez" },
    { firstName: "Florencia", lastName: "Perez",     age: 24, phoneNumber: 2615558901, email: "florencia@test.com", password: "cliente123", address: "Rivadavia, Mendoza",  birthDate: new Date("2000-02-28"), dni: 46890123, userName: "fperez" },
    { firstName: "Agustin",   lastName: "Diaz",      age: 29, phoneNumber: 2615559012, email: "agustin@test.com",   password: "cliente123", address: "Junin, Mendoza",      birthDate: new Date("1995-08-03"), dni: 39901234, userName: "adiaz" },
    { firstName: "Micaela",   lastName: "Ruiz",      age: 26, phoneNumber: 2615550123, email: "micaela@test.com",   password: "cliente123", address: "Tunuyan, Mendoza",    birthDate: new Date("1998-05-17"), dni: 44012345, userName: "mruiz" },
]

const professionals = [
    // Albanil (10)
    { firstName: "Daniel",    lastName: "Castro",    age: 45, phoneNumber: 2614100001, email: "dcastro@test.com",    password: "prof123", address: "Capital, Mendoza",    birthDate: new Date("1980-10-08"), dni: 25000001, userName: "dcastro",    specialty: "Albanil", yearsOfExperience: 20, registrationNumber: 10001 },
    { firstName: "Ricardo",   lastName: "Blanco",    age: 40, phoneNumber: 2614100002, email: "rblanco@test.com",    password: "prof123", address: "Maipu, Mendoza",      birthDate: new Date("1985-03-12"), dni: 25000002, userName: "rblanco",    specialty: "Albanil", yearsOfExperience: 15, registrationNumber: 10002 },
    { firstName: "Hector",    lastName: "Vega",      age: 50, phoneNumber: 2614100003, email: "hvega@test.com",      password: "prof123", address: "Godoy Cruz, Mendoza", birthDate: new Date("1975-06-20"), dni: 25000003, userName: "hvega",      specialty: "Albanil", yearsOfExperience: 25, registrationNumber: 10003 },
    { firstName: "Omar",      lastName: "Quintero",  age: 38, phoneNumber: 2614100004, email: "oquintero@test.com",  password: "prof123", address: "Las Heras, Mendoza",  birthDate: new Date("1987-01-05"), dni: 25000004, userName: "oquintero",  specialty: "Albanil", yearsOfExperience: 12, registrationNumber: 10004 },
    { firstName: "Ramon",     lastName: "Acosta",    age: 43, phoneNumber: 2614100005, email: "racosta@test.com",    password: "prof123", address: "Guaymallen, Mendoza", birthDate: new Date("1982-09-17"), dni: 25000005, userName: "racosta",    specialty: "Albanil", yearsOfExperience: 18, registrationNumber: 10005 },
    { firstName: "Jorge",     lastName: "Medina",    age: 36, phoneNumber: 2614100006, email: "jmedina@test.com",    password: "prof123", address: "Lujan, Mendoza",      birthDate: new Date("1989-04-30"), dni: 25000006, userName: "jmedina",    specialty: "Albanil", yearsOfExperience: 10, registrationNumber: 10006 },
    { firstName: "Pablo",     lastName: "Soria",     age: 47, phoneNumber: 2614100007, email: "psoria@test.com",     password: "prof123", address: "San Martin, Mendoza", birthDate: new Date("1978-11-22"), dni: 25000007, userName: "psoria",     specialty: "Albanil", yearsOfExperience: 22, registrationNumber: 10007 },
    { firstName: "Carlos",    lastName: "Ibarra",    age: 33, phoneNumber: 2614100008, email: "cibarra@test.com",    password: "prof123", address: "Rivadavia, Mendoza",  birthDate: new Date("1992-07-14"), dni: 25000008, userName: "cibarra",    specialty: "Albanil", yearsOfExperience: 8,  registrationNumber: 10008 },
    { firstName: "Miguel",    lastName: "Paredes",   age: 41, phoneNumber: 2614100009, email: "mparedes@test.com",   password: "prof123", address: "Junin, Mendoza",      birthDate: new Date("1984-02-28"), dni: 25000009, userName: "mparedes",   specialty: "Albanil", yearsOfExperience: 16, registrationNumber: 10009 },
    { firstName: "Fernando",  lastName: "Salinas",   age: 35, phoneNumber: 2614100010, email: "fsalinas@test.com",   password: "prof123", address: "Tunuyan, Mendoza",    birthDate: new Date("1990-05-10"), dni: 25000010, userName: "fsalinas",   specialty: "Albanil", yearsOfExperience: 9,  registrationNumber: 10010 },

    // Electricista (10)
    { firstName: "Roberto",   lastName: "Silva",     age: 42, phoneNumber: 2614200001, email: "rsilva@test.com",     password: "prof123", address: "Maipu, Mendoza",      birthDate: new Date("1983-02-11"), dni: 25000011, userName: "rsilva",     specialty: "Electricista", yearsOfExperience: 18, registrationNumber: 20001 },
    { firstName: "Alejandro", lastName: "Mendez",    age: 41, phoneNumber: 2614200002, email: "amendez@test.com",    password: "prof123", address: "Godoy Cruz, Mendoza", birthDate: new Date("1984-09-14"), dni: 25000012, userName: "amendez",    specialty: "Electricista", yearsOfExperience: 17, registrationNumber: 20002 },
    { firstName: "Eduardo",   lastName: "Ponce",     age: 38, phoneNumber: 2614200003, email: "eponce@test.com",     password: "prof123", address: "Capital, Mendoza",    birthDate: new Date("1987-12-03"), dni: 25000013, userName: "eponce",     specialty: "Electricista", yearsOfExperience: 13, registrationNumber: 20003 },
    { firstName: "Leandro",   lastName: "Cabrera",   age: 33, phoneNumber: 2614200004, email: "lcabrera@test.com",   password: "prof123", address: "Las Heras, Mendoza",  birthDate: new Date("1992-08-19"), dni: 25000014, userName: "lcabrera",   specialty: "Electricista", yearsOfExperience: 8,  registrationNumber: 20004 },
    { firstName: "Maximiliano",lastName: "Rios",     age: 45, phoneNumber: 2614200005, email: "mrios@test.com",      password: "prof123", address: "Guaymallen, Mendoza", birthDate: new Date("1980-03-25"), dni: 25000015, userName: "mrios",      specialty: "Electricista", yearsOfExperience: 20, registrationNumber: 20005 },
    { firstName: "Sebastian",  lastName: "Gimenez",  age: 36, phoneNumber: 2614200006, email: "sgimenez@test.com",   password: "prof123", address: "Lujan, Mendoza",      birthDate: new Date("1989-07-08"), dni: 25000016, userName: "sgimenez",   specialty: "Electricista", yearsOfExperience: 11, registrationNumber: 20006 },
    { firstName: "Cristian",  lastName: "Molina",    age: 39, phoneNumber: 2614200007, email: "cmolina@test.com",    password: "prof123", address: "San Martin, Mendoza", birthDate: new Date("1986-01-17"), dni: 25000017, userName: "cmolina",    specialty: "Electricista", yearsOfExperience: 14, registrationNumber: 20007 },
    { firstName: "Andres",    lastName: "Suarez",    age: 44, phoneNumber: 2614200008, email: "asuarez@test.com",    password: "prof123", address: "Rivadavia, Mendoza",  birthDate: new Date("1981-10-30"), dni: 25000018, userName: "asuarez",    specialty: "Electricista", yearsOfExperience: 19, registrationNumber: 20008 },
    { firstName: "Gabriel",   lastName: "Peralta",   age: 31, phoneNumber: 2614200009, email: "gperalta@test.com",   password: "prof123", address: "Junin, Mendoza",      birthDate: new Date("1994-04-22"), dni: 25000019, userName: "gperalta",   specialty: "Electricista", yearsOfExperience: 6,  registrationNumber: 20009 },
    { firstName: "Ivan",      lastName: "Cardenas",  age: 37, phoneNumber: 2614200010, email: "icardenas@test.com",  password: "prof123", address: "Tunuyan, Mendoza",    birthDate: new Date("1988-06-05"), dni: 25000020, userName: "icardenas",  specialty: "Electricista", yearsOfExperience: 12, registrationNumber: 20010 },

    // Plomero (10)
    { firstName: "Pedro",     lastName: "Lopez",     age: 35, phoneNumber: 2614300001, email: "plopez@test.com",     password: "prof123", address: "Las Heras, Mendoza",  birthDate: new Date("1990-07-20"), dni: 25000021, userName: "plopez",     specialty: "Plomero", yearsOfExperience: 10, registrationNumber: 30001 },
    { firstName: "Claudio",   lastName: "Navarro",   age: 48, phoneNumber: 2614300002, email: "cnavarro@test.com",   password: "prof123", address: "Maipu, Mendoza",      birthDate: new Date("1977-01-15"), dni: 25000022, userName: "cnavarro",   specialty: "Plomero", yearsOfExperience: 23, registrationNumber: 30002 },
    { firstName: "Ruben",     lastName: "Escobar",   age: 40, phoneNumber: 2614300003, email: "rescobar@test.com",   password: "prof123", address: "Godoy Cruz, Mendoza", birthDate: new Date("1985-05-28"), dni: 25000023, userName: "rescobar",   specialty: "Plomero", yearsOfExperience: 15, registrationNumber: 30003 },
    { firstName: "Walter",    lastName: "Benitez",   age: 43, phoneNumber: 2614300004, email: "wbenitez@test.com",   password: "prof123", address: "Capital, Mendoza",    birthDate: new Date("1982-09-09"), dni: 25000024, userName: "wbenitez",   specialty: "Plomero", yearsOfExperience: 18, registrationNumber: 30004 },
    { firstName: "Hugo",      lastName: "Vera",      age: 37, phoneNumber: 2614300005, email: "hvera@test.com",      password: "prof123", address: "Guaymallen, Mendoza", birthDate: new Date("1988-03-14"), dni: 25000025, userName: "hvera",      specialty: "Plomero", yearsOfExperience: 12, registrationNumber: 30005 },
    { firstName: "Ezequiel",  lastName: "Campos",    age: 30, phoneNumber: 2614300006, email: "ecampos@test.com",    password: "prof123", address: "Lujan, Mendoza",      birthDate: new Date("1995-11-02"), dni: 25000026, userName: "ecampos",    specialty: "Plomero", yearsOfExperience: 5,  registrationNumber: 30006 },
    { firstName: "Ariel",     lastName: "Figueroa",  age: 46, phoneNumber: 2614300007, email: "afigueroa@test.com",  password: "prof123", address: "San Martin, Mendoza", birthDate: new Date("1979-07-18"), dni: 25000027, userName: "afigueroa",  specialty: "Plomero", yearsOfExperience: 21, registrationNumber: 30007 },
    { firstName: "Gonzalo",   lastName: "Rojas",     age: 34, phoneNumber: 2614300008, email: "grojas@test.com",     password: "prof123", address: "Rivadavia, Mendoza",  birthDate: new Date("1991-12-25"), dni: 25000028, userName: "grojas",     specialty: "Plomero", yearsOfExperience: 9,  registrationNumber: 30008 },
    { firstName: "Leonardo",  lastName: "Aguirre",   age: 39, phoneNumber: 2614300009, email: "laguirre@test.com",   password: "prof123", address: "Junin, Mendoza",      birthDate: new Date("1986-08-07"), dni: 25000029, userName: "laguirre",   specialty: "Plomero", yearsOfExperience: 14, registrationNumber: 30009 },
    { firstName: "Marcelo",   lastName: "Palacios",  age: 52, phoneNumber: 2614300010, email: "mpalacios@test.com",  password: "prof123", address: "Tunuyan, Mendoza",    birthDate: new Date("1973-04-11"), dni: 25000030, userName: "mpalacios",  specialty: "Plomero", yearsOfExperience: 27, registrationNumber: 30010 },

    // Mecanico (10)
    { firstName: "Juan",      lastName: "Ferreyra",  age: 38, phoneNumber: 2614400001, email: "jferreyra@test.com",  password: "prof123", address: "Capital, Mendoza",    birthDate: new Date("1987-02-14"), dni: 25000031, userName: "jferreyra",  specialty: "Mecanico", yearsOfExperience: 13, registrationNumber: 40001 },
    { firstName: "Rodrigo",   lastName: "Godoy",     age: 35, phoneNumber: 2614400002, email: "rgodoy@test.com",     password: "prof123", address: "Maipu, Mendoza",      birthDate: new Date("1990-06-30"), dni: 25000032, userName: "rgodoy",     specialty: "Mecanico", yearsOfExperience: 10, registrationNumber: 40002 },
    { firstName: "Diego",     lastName: "Alvarez",   age: 44, phoneNumber: 2614400003, email: "dalvarez@test.com",   password: "prof123", address: "Godoy Cruz, Mendoza", birthDate: new Date("1981-10-16"), dni: 25000033, userName: "dalvarez",   specialty: "Mecanico", yearsOfExperience: 19, registrationNumber: 40003 },
    { firstName: "Emiliano",  lastName: "Ortiz",     age: 32, phoneNumber: 2614400004, email: "eortiz@test.com",     password: "prof123", address: "Las Heras, Mendoza",  birthDate: new Date("1993-03-08"), dni: 25000034, userName: "eortiz",     specialty: "Mecanico", yearsOfExperience: 7,  registrationNumber: 40004 },
    { firstName: "Hernan",    lastName: "Contreras", age: 47, phoneNumber: 2614400005, email: "hcontreras@test.com", password: "prof123", address: "Guaymallen, Mendoza", birthDate: new Date("1978-08-23"), dni: 25000035, userName: "hcontreras", specialty: "Mecanico", yearsOfExperience: 22, registrationNumber: 40005 },
    { firstName: "Damian",    lastName: "Juarez",    age: 36, phoneNumber: 2614400006, email: "djuarez@test.com",    password: "prof123", address: "Lujan, Mendoza",      birthDate: new Date("1989-12-01"), dni: 25000036, userName: "djuarez",    specialty: "Mecanico", yearsOfExperience: 11, registrationNumber: 40006 },
    { firstName: "Federico",  lastName: "Luna",      age: 41, phoneNumber: 2614400007, email: "fluna@test.com",      password: "prof123", address: "San Martin, Mendoza", birthDate: new Date("1984-05-19"), dni: 25000037, userName: "fluna",      specialty: "Mecanico", yearsOfExperience: 16, registrationNumber: 40007 },
    { firstName: "Mauricio",  lastName: "Carrizo",   age: 39, phoneNumber: 2614400008, email: "mcarrizo@test.com",   password: "prof123", address: "Rivadavia, Mendoza",  birthDate: new Date("1986-09-27"), dni: 25000038, userName: "mcarrizo",   specialty: "Mecanico", yearsOfExperience: 14, registrationNumber: 40008 },
    { firstName: "Nicolas",   lastName: "Quiroga",   age: 33, phoneNumber: 2614400009, email: "nquiroga@test.com",   password: "prof123", address: "Junin, Mendoza",      birthDate: new Date("1992-01-13"), dni: 25000039, userName: "nquiroga",   specialty: "Mecanico", yearsOfExperience: 8,  registrationNumber: 40009 },
    { firstName: "Santiago",  lastName: "Paz",       age: 49, phoneNumber: 2614400010, email: "spaz@test.com",       password: "prof123", address: "Tunuyan, Mendoza",    birthDate: new Date("1976-07-04"), dni: 25000040, userName: "spaz",       specialty: "Mecanico", yearsOfExperience: 24, registrationNumber: 40010 },

    // Cerrajero (10)
    { firstName: "Adrian",    lastName: "Flores",    age: 44, phoneNumber: 2614500001, email: "aflores@test.com",    password: "prof123", address: "Lujan, Mendoza",      birthDate: new Date("1981-11-03"), dni: 25000041, userName: "aflores",    specialty: "Cerrajero", yearsOfExperience: 19, registrationNumber: 50001 },
    { firstName: "Cesar",     lastName: "Miranda",   age: 37, phoneNumber: 2614500002, email: "cmiranda@test.com",   password: "prof123", address: "Capital, Mendoza",    birthDate: new Date("1988-04-20"), dni: 25000042, userName: "cmiranda",   specialty: "Cerrajero", yearsOfExperience: 12, registrationNumber: 50002 },
    { firstName: "Esteban",   lastName: "Leal",      age: 42, phoneNumber: 2614500003, email: "eleal@test.com",      password: "prof123", address: "Maipu, Mendoza",      birthDate: new Date("1983-08-15"), dni: 25000043, userName: "eleal",      specialty: "Cerrajero", yearsOfExperience: 17, registrationNumber: 50003 },
    { firstName: "Fabian",    lastName: "Montes",    age: 35, phoneNumber: 2614500004, email: "fmontes@test.com",    password: "prof123", address: "Godoy Cruz, Mendoza", birthDate: new Date("1990-02-06"), dni: 25000044, userName: "fmontes",    specialty: "Cerrajero", yearsOfExperience: 10, registrationNumber: 50004 },
    { firstName: "Ignacio",   lastName: "Soto",      age: 29, phoneNumber: 2614500005, email: "isoto@test.com",      password: "prof123", address: "Las Heras, Mendoza",  birthDate: new Date("1996-10-18"), dni: 25000045, userName: "isoto",      specialty: "Cerrajero", yearsOfExperience: 4,  registrationNumber: 50005 },
    { firstName: "Julian",    lastName: "Barrios",   age: 46, phoneNumber: 2614500006, email: "jbarrios@test.com",   password: "prof123", address: "Guaymallen, Mendoza", birthDate: new Date("1979-06-24"), dni: 25000046, userName: "jbarrios",   specialty: "Cerrajero", yearsOfExperience: 21, registrationNumber: 50006 },
    { firstName: "Kevin",     lastName: "Villareal", age: 28, phoneNumber: 2614500007, email: "kvillareal@test.com", password: "prof123", address: "San Martin, Mendoza", birthDate: new Date("1997-01-31"), dni: 25000047, userName: "kvillareal", specialty: "Cerrajero", yearsOfExperience: 3,  registrationNumber: 50007 },
    { firstName: "Lorenzo",   lastName: "Mena",      age: 53, phoneNumber: 2614500008, email: "lmena@test.com",      password: "prof123", address: "Rivadavia, Mendoza",  birthDate: new Date("1972-09-09"), dni: 25000048, userName: "lmena",      specialty: "Cerrajero", yearsOfExperience: 28, registrationNumber: 50008 },
    { firstName: "Marcos",    lastName: "Trujillo",  age: 40, phoneNumber: 2614500009, email: "mtrujillo@test.com",  password: "prof123", address: "Junin, Mendoza",      birthDate: new Date("1985-03-22"), dni: 25000049, userName: "mtrujillo",  specialty: "Cerrajero", yearsOfExperience: 15, registrationNumber: 50009 },
    { firstName: "Nahuel",    lastName: "Arce",      age: 31, phoneNumber: 2614500010, email: "narce@test.com",      password: "prof123", address: "Tunuyan, Mendoza",    birthDate: new Date("1994-11-14"), dni: 25000050, userName: "narce",      specialty: "Cerrajero", yearsOfExperience: 6,  registrationNumber: 50010 },

    // Metalurgico (10)
    { firstName: "Sergio",    lastName: "Romero",    age: 37, phoneNumber: 2614600001, email: "sromero@test.com",    password: "prof123", address: "Tunuyan, Mendoza",    birthDate: new Date("1988-06-22"), dni: 25000051, userName: "sromero",    specialty: "Metalurgico", yearsOfExperience: 13, registrationNumber: 60001 },
    { firstName: "Oscar",     lastName: "Villanueva",age: 50, phoneNumber: 2614600002, email: "ovillanueva@test.com",password: "prof123", address: "Capital, Mendoza",    birthDate: new Date("1975-01-07"), dni: 25000052, userName: "ovillanueva",specialty: "Metalurgico", yearsOfExperience: 25, registrationNumber: 60002 },
    { firstName: "Patricio",  lastName: "Delgado",   age: 43, phoneNumber: 2614600003, email: "pdelgado@test.com",   password: "prof123", address: "Maipu, Mendoza",      birthDate: new Date("1982-07-29"), dni: 25000053, userName: "pdelgado",   specialty: "Metalurgico", yearsOfExperience: 18, registrationNumber: 60003 },
    { firstName: "Raul",      lastName: "Sepulveda", age: 46, phoneNumber: 2614600004, email: "rsepulveda@test.com", password: "prof123", address: "Godoy Cruz, Mendoza", birthDate: new Date("1979-04-13"), dni: 25000054, userName: "rsepulveda", specialty: "Metalurgico", yearsOfExperience: 21, registrationNumber: 60004 },
    { firstName: "Tomas",     lastName: "Bravo",     age: 34, phoneNumber: 2614600005, email: "tbravo@test.com",     password: "prof123", address: "Las Heras, Mendoza",  birthDate: new Date("1991-10-05"), dni: 25000055, userName: "tbravo",     specialty: "Metalurgico", yearsOfExperience: 9,  registrationNumber: 60005 },
    { firstName: "Victor",    lastName: "Parra",     age: 41, phoneNumber: 2614600006, email: "vparra@test.com",     password: "prof123", address: "Guaymallen, Mendoza", birthDate: new Date("1984-02-17"), dni: 25000056, userName: "vparra",     specialty: "Metalurgico", yearsOfExperience: 16, registrationNumber: 60006 },
    { firstName: "Wilson",    lastName: "Tapia",     age: 38, phoneNumber: 2614600007, email: "wtapia@test.com",     password: "prof123", address: "Lujan, Mendoza",      birthDate: new Date("1987-08-28"), dni: 25000057, userName: "wtapia",     specialty: "Metalurgico", yearsOfExperience: 13, registrationNumber: 60007 },
    { firstName: "Alfredo",   lastName: "Cortes",    age: 55, phoneNumber: 2614600008, email: "acortes@test.com",    password: "prof123", address: "San Martin, Mendoza", birthDate: new Date("1970-05-03"), dni: 25000058, userName: "acortes",    specialty: "Metalurgico", yearsOfExperience: 30, registrationNumber: 60008 },
    { firstName: "Bernardo",  lastName: "Lara",      age: 32, phoneNumber: 2614600009, email: "blara@test.com",      password: "prof123", address: "Rivadavia, Mendoza",  birthDate: new Date("1993-12-19"), dni: 25000059, userName: "blara",      specialty: "Metalurgico", yearsOfExperience: 7,  registrationNumber: 60009 },
    { firstName: "Claudio",   lastName: "Espinoza",  age: 44, phoneNumber: 2614600010, email: "cespinoza@test.com",  password: "prof123", address: "Junin, Mendoza",      birthDate: new Date("1981-03-26"), dni: 25000060, userName: "cespinoza",  specialty: "Metalurgico", yearsOfExperience: 19, registrationNumber: 60010 },

    // Gasista (10)
    { firstName: "Nicolas",   lastName: "Vargas",    age: 40, phoneNumber: 2614700001, email: "nvargas@test.com",    password: "prof123", address: "San Martin, Mendoza", birthDate: new Date("1985-08-30"), dni: 25000061, userName: "nvargas",    specialty: "Gasista", yearsOfExperience: 16, registrationNumber: 70001 },
    { firstName: "Dario",     lastName: "Heredia",   age: 36, phoneNumber: 2614700002, email: "dheredia@test.com",   password: "prof123", address: "Capital, Mendoza",    birthDate: new Date("1989-02-10"), dni: 25000062, userName: "dheredia",   specialty: "Gasista", yearsOfExperience: 11, registrationNumber: 70002 },
    { firstName: "Enrique",   lastName: "Maldonado", age: 49, phoneNumber: 2614700003, email: "emaldonado@test.com", password: "prof123", address: "Maipu, Mendoza",      birthDate: new Date("1976-06-17"), dni: 25000063, userName: "emaldonado", specialty: "Gasista", yearsOfExperience: 24, registrationNumber: 70003 },
    { firstName: "Flavio",    lastName: "Arias",     age: 33, phoneNumber: 2614700004, email: "farias@test.com",     password: "prof123", address: "Godoy Cruz, Mendoza", birthDate: new Date("1992-10-29"), dni: 25000064, userName: "farias",     specialty: "Gasista", yearsOfExperience: 8,  registrationNumber: 70004 },
    { firstName: "Gaston",    lastName: "Coria",     age: 42, phoneNumber: 2614700005, email: "gcoria@test.com",     password: "prof123", address: "Las Heras, Mendoza",  birthDate: new Date("1983-04-08"), dni: 25000065, userName: "gcoria",     specialty: "Gasista", yearsOfExperience: 17, registrationNumber: 70005 },
    { firstName: "Horacio",   lastName: "Peña",      age: 47, phoneNumber: 2614700006, email: "hpena@test.com",      password: "prof123", address: "Guaymallen, Mendoza", birthDate: new Date("1978-09-21"), dni: 25000066, userName: "hpena",      specialty: "Gasista", yearsOfExperience: 22, registrationNumber: 70006 },
    { firstName: "Israel",    lastName: "Cisneros",  age: 31, phoneNumber: 2614700007, email: "icisneros@test.com",  password: "prof123", address: "Lujan, Mendoza",      birthDate: new Date("1994-01-16"), dni: 25000067, userName: "icisneros",  specialty: "Gasista", yearsOfExperience: 6,  registrationNumber: 70007 },
    { firstName: "Javier",    lastName: "Bustos",    age: 45, phoneNumber: 2614700008, email: "jbustos@test.com",    password: "prof123", address: "Rivadavia, Mendoza",  birthDate: new Date("1980-07-03"), dni: 25000068, userName: "jbustos",    specialty: "Gasista", yearsOfExperience: 20, registrationNumber: 70008 },
    { firstName: "Kenneth",   lastName: "Pacheco",   age: 38, phoneNumber: 2614700009, email: "kpacheco@test.com",   password: "prof123", address: "Junin, Mendoza",      birthDate: new Date("1987-11-27"), dni: 25000069, userName: "kpacheco",   specialty: "Gasista", yearsOfExperience: 13, registrationNumber: 70009 },
    { firstName: "Luis",      lastName: "Valenzuela",age: 52, phoneNumber: 2614700010, email: "lvalenzuela@test.com",password: "prof123", address: "Tunuyan, Mendoza",    birthDate: new Date("1973-03-12"), dni: 25000070, userName: "lvalenzuela",specialty: "Gasista", yearsOfExperience: 27, registrationNumber: 70010 },
]

export async function seed() {
    const userRepository = AppDataSource.getRepository(User)
    const reviewRepository = AppDataSource.getRepository(Review)

    console.log("Limpiando datos de prueba anteriores...")
    await reviewRepository.query('DELETE FROM review')
    await userRepository.delete({ role: Role.CLIENT })
    await userRepository.delete({ role: Role.PROFESSIONAL })

    console.log("Creando 10 clientes...")
    for (const data of clients) {
        await userRepository.save(userRepository.create({ ...data, role: Role.CLIENT }))
        console.log(`  ✓ ${data.firstName} ${data.lastName}`)
    }

    const specialties = ["Albanil", "Electricista", "Plomero", "Mecanico", "Cerrajero", "Metalurgico", "Gasista"]
    console.log(`\nCreando 70 profesionales (10 por cada especialidad)...`)
    const savedProfessionals: User[] = []
    for (const specialty of specialties) {
        const group = professionals.filter(p => p.specialty === specialty)
        console.log(`\n  [${specialty}]`)
        for (const data of group) {
            const pro = await userRepository.save(userRepository.create({ ...data, role: Role.PROFESSIONAL }))
            savedProfessionals.push(pro)
            console.log(`    ✓ ${data.firstName} ${data.lastName}`)
        }
    }

    console.log("\nCreando reseñas de prueba...")
    for (const pro of savedProfessionals) {
        const numReviews = Math.floor(Math.random() * 3) + 3 // 3 a 5 reseñas por profesional
        for (let i = 0; i < numReviews; i++) {
            const review = reviewComments[Math.floor(Math.random() * reviewComments.length)]
            const client = reviewClients[Math.floor(Math.random() * reviewClients.length)]
            await reviewRepository.save(reviewRepository.create({
                professionalId: pro.id,
                clientName: client,
                rating: review.rating,
                comment: review.comment
            }))
        }
    }
    console.log("  ✓ Reseñas creadas para todos los profesionales")

    console.log("\nSeed completado: 10 clientes + 70 profesionales + reseñas.")
}
