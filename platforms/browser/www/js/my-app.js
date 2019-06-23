var $$ = Dom7;

var app = new Framework7({
	root: '#app',
	name: 'F7App',
	cache: false,
	id: 'com.ubaya.f7app',
	panel: { swipe: 'left' },
	theme: 'md',
	routes: [
		{
			path: '/index/',
			url: 'index.html',
		},
		{
			path: '/login/',
			url: 'login.html',
			on: {
				pageInit: function(e, page){
					$$("#btnsignin").on('click', function(){

				        var username = $$('#user_name').val();
						var password = $$('#passwordlogin').val();

						var x = new FormData($$('.form-login')[0]);
						
						app.request.post('http://192.168.1.8:280/ecurhat/login.php',
							{username:username, password:password}, function(data){
								localStorage.username = username;
								var obj = JSON.parse(data);
								// console.log(data);
								for (var i = 0; i < obj.length; i++){
									var usern = obj[i]['username'];
									var pass = obj[i]['password'];
									var kategori = obj[i]['status'];
									

									if(username != usern){
										app.dialog.alert('Anda Belum terdaftar');
									}
									else{

										if(kategori == 'klien'){
											localStorage.kategori = kategori;
										page.router.navigate('/beranda/');
										}
										else if(kategori == 'konselor'){
											localStorage.kategori = kategori;
											page.router.navigate('/berandabackend/');
										}
										else if(kategori == 'admin'){
											localStorage.kategori = kategori;
											page.router.navigate('/berandabackend/');
										}
										else if(kategori != 'admin' && kategori == 'konselor' && kategori == 'klien'){
											app.dialog.alert('Anda Belum terdaftar');
										}
									}
								}
							
						});

						app.panel.disableSwipe();
					});

					$$("#btncall").on('click', function(){
						document.addEventListener('deviceready', () => {
						  app.dialog.alert('Device ready event fired!');
						   console.log(window.plugins.CallNumber.callNumber); // Undefined
						   window.plugins.CallNumber.callNumber(
							function(){
								app.dialog.alert("call");
							}, 
							function(e){},
							"+6282245280715");
							// window.plugins.CallNumber.callNumber = function(success, failure, number, bypassAppChooser){
							//     cordova.exec(app.dialog.alert("sukses"), failure, "CallNumber", "callNumber", [number, bypassAppChooser]);
							// };
						});
						
					});
				},
			}
		},
		{
			path: '/register/',
			url: 'register.html',
			on:{
				pageInit: function(e, page){
					$$('#btndaftar').on('click', function(){
						var username = $$('#username').val();
						var password = $$('#password').val();

						var x = new FormData($$('.register')[0]);
				       								
						app.request.post('http://192.168.1.8:280/ecurhat/registeruser.php', 
						x, function(data){
						 app.dialog.alert("Akun anda berhasil terdaftar");
						 page.router.navigate('/login/');
						});
					});
					
				},
			}
		},
		{
			path: '/beranda/',
			url: 'beranda.html',
			on:{
				pageInit: function(e, page){
					username = localStorage.username;
					var welcome = "Selamat Datang " + '"' + username + '"' ;
					$$('#welcome').html(welcome);
					//sebenarnya ada 5 tapi yang diajarkan hanya 3

					$$('.delete-storage-data').on('click', function() {
			 			// localStorage.removeItem("username");
			 			// localStorage.clear();
						window.localStorage.clear();
						  // app.dialog.alert('Form data deleted')
					});
				},
				pageAfterIn: function(e, page){
					if (!localStorage.username) {
						page.router.navigate('/login/');
					}
				}
			}
		},
		{
			path: '/berandabackend/',
			url: 'berandabackend.html',
			on:{
				pageInit: function(e, page){
					username = localStorage.username;
					kategori = localStorage.kategori;
					var welcome = "Selamat Datang " + '"' + username + '"' ;
					if (kategori == 'admin') {
						var kat = "<input type='hidden' name='kategori' id='kategori' value='"+ kategori +"'>";
						$$('#username').html(kat);
						var ad = "<br>" + 
			                "<a href='/tambahkategori/' class='col button button-big button-fill' id='btnlist'>Tambah Kategori Masalah</a>" +
			                "<br>" +
			                "<a href='/tambahkonselor/' class='col button button-big button-fill' id='btnlist'>Tambah Konselor</a>" +
			                "<br>" + 
			                "<a href='/daftarkonfirmasichat/' class='col button button-big button-fill' id='btnlist'>Daftar Konfirmasi Chat</a>";
			            $$('#tambah').html(ad);
					}
					else if (kategori == 'konselor'){
						var usernm = "<input type='hidden' name='user_name' id='user_name' value='"+ username +"'>";
						var kat = "<input type='hidden' name='kategori' id='kategori' value='"+ kategori +"'>";
						$$('#username').html(usernm,kat);
						var ad = "<br>" + 
			                "<a href='/daftarprogress/' class='col button button-big button-fill' id='btnlist'>Progress Keluhan</a>" + "<br>" +
			                "<a href='/historykeluhan/' class='col button button-big button-fill' id='btnlist'>Lihat History Keluhan</a>";
			            $$('#tambah').html(ad);
					}


					$$('.title').html(kategori);
					$$('#welcome').html(welcome);
					$$('#btnBatal').on('click', function(){
						page.router.navigate('/profil/');
					});

					$$('.delete-storage-data').on('click', function() {
						window.localStorage.clear();
			 			// localStorage.removeItem('username');
			 			// localStorage.clear();
						 //  var storedData = app.dialog.formDeleteData('beranda-konselor');
						  // app.dialog.alert('Form data deleted')
					});
				},
				pageAfterIn: function(e, page){
					if (!localStorage.username) {
						page.router.navigate('/login/');
					}
				}
			}
		},
		{
			path:'/keluhan/',
			url: 'keluhan.html', 
			on:{
				pageInit: function(e, page){
					app.panel.disableSwipe();
					$$('#datadilaporkan').hide();
					$$('#status').show();
					

					$$("#cekpelapor").on('change', function(){
						if($$('#cekpelapor').is(":checked")){
							$$('#datadilaporkan').show();
							$$('#cekidentitas').hide();
							$$('#status').hide();
						}
						else{
							$$('#datadilaporkan').hide();
							$$('#cekidentitas').show();
							
						}
					});

					var checkboxidentitas = 
					"<li>" +
	                    "<label class='item-checkbox item-content'>" + 
	                      "<input type='checkbox' id='cekanon' name='cekanon' value='"+ identitas +"'/>" + 
	                      "<i class='icon icon-checkbox'></i>" +
	                      "<div class='item-inner'>" + 
	                        "<div class='item-title'>Sebagai Anonymous</div>" +
	                      "</div>"
	                    "</label>"
	                "</li>";
	                $$('#cekidentitas').html(checkboxidentitas);
					
					var identitas ="klien"; 

	                $$('#cekanon').on('change', function(){
						if($$('#cekanon').is(":checked")){
							identitas = "anonymous";
						}
						else{
							identitas = "klien";
						}
					});

					$$("#btnkrmkeluhan").on('click', function(){
						// app.dialog.alert(identitas);
						username = localStorage.username;
				       	// app.dialog.alert(username);
				       	var usernm = "<input type='hidden' name='user_name' id='user_name' value='"+ username +"'>";
				       	var iden = "<input type='hidden' name='identitas_klien' id='identitas_klien' value='"+ identitas +"'>";
						$$('#username').html(usernm);
						$$('#status_identitas').html(iden);

						var x = new FormData($$('.keluhan')[0]);
						app.request.post('http://192.168.1.8:280/ecurhat/insertkeluhan.php', x, function(data){
							var idkeluhan = data;
							// var lastidkeluhan = "<input type='hidden' name='keluhan_id' id='keluhan_id' value='"+idkeluhan+"'>";
							// $$('#lastidkeluhan').html(lastidkeluhan);
							app.dialog.alert(idkeluhan);
						});

						$$("#cekpelapor").on('change', function(){
							if($$('#cekpelapor').is(":checked")){
								
							}
						});

						page.router.navigate('/beranda/');
					});

					$$("#btnbtlkeluhan").on('click', function(){
						app.dialog.confirm('Apakah anda yakin ingin meembatalkan pesan keluhan ini?', function () {
						    page.router.navigate('/beranda/');
						  });
					});
					//sebenarnya ada 5 tapi yang diajarkan hanya 3
				},
			}
		},
		{
			path: '/daftarkeluhan/',
			url: 'daftarkeluhan.html',
			on:{ 
				pageInit: function(e, page){
					app.panel.disableSwipe();
					username = localStorage.username;
					status = localStorage.kategori;
					tipehal = "keluhanmasuk";
					localStorage.tipehal = tipehal;

					app.request.post('http://192.168.1.8:280/ecurhat/showlistkeluhan.php', {username, status, tipehal} , function(data){
					var obj = JSON.parse(data);
						for (var i = 0; i < obj.length; i++) {
							var str = 
							"<li>" +
			                  "<a href='/viewkeluhan/"+ obj[i]['id_keluhan'] +"' class='item-link item-content'>" +
			                    "<div class='item-inner'>" +
			                      "<div class='item-title-row'>" +
			                        "<div class='item-title'>"+ obj[i]['topik_pesan'] +"</div>" +
			                        "<div class='item-after'>"+ obj[i]['tanggal_diterima'] +"</div>" +
			                      "</div>" +
			                      "<div class='item-text'>" + obj[i]['isi_pesan'] + "</div>"
			                    "</div>" +
			                  "</a>" +
			                "</li>";
			                $$('#daftarkeluhan').append(str);
						}
					});
				}	
			}
		},
		{
			path: '/daftarkonfirmasichat/',
			url: 'daftarkonfirmasichat.html',
			on:{
				pageInit: function(e, page){
					app.panel.disableSwipe();
					username = localStorage.username;
					status = localStorage.kategori;
					tipehal = "konfirmasichat";
					localStorage.tipehal = tipehal;

					app.request.post('http://192.168.1.8:280/ecurhat/showlistkeluhan.php', {username, status, tipehal} , function(data){
					var obj = JSON.parse(data);
						for (var i = 0; i < obj.length; i++) {
							var str = 
							"<li>" +
			                  "<a href='/viewkeluhan/"+ obj[i]['id_keluhan'] +"' class='item-link item-content'>" +
			                    "<div class='item-inner'>" +
			                      "<div class='item-title-row'>" +
			                        "<div class='item-title'>"+ obj[i]['topik_pesan'] +"</div>" +
			                        "<div class='item-after'>"+ obj[i]['tanggal_diterima'] +"</div>" +
			                      "</div>" +
			                      "<div class='item-text'>" + obj[i]['isi_pesan'] + "</div>"
			                    "</div>" +
			                  "</a>" +
			                "</li>";
			                $$('#daftarkonfirmasi').append(str);
						}
					});
				}
			}
		},
		{
			path: '/viewkeluhan/:keluhanid',
			url: 'viewkeluhan.html',
			on:{
				pageInit: function(e, page){
					var id = page.router.currentRoute.params.keluhanid;
					tipe = localStorage.tipehal;
					username = localStorage.username;
					kategori = localStorage.kategori;
					// var welcome = "Selamat Datang " + '"' + username + '"' ;

					var keluhan = "<input type='hidden' name='keluhan_id' id='keluhan_id' value='"+ id +"'>";


					$$('#keluhan').html(keluhan);

					// app.dialog.alert(id);
					app.request.post("http://192.168.1.8:280/ecurhat/viewkeluhan.php?id="+id, {}, function(data){
					// app.dialog.alert(data);
					var obj = JSON.parse(data);
						for (var i = 0; i < obj.length; i++) {
							var datakeluhan =
							 "<input type='hidden' id='idkeluhan' name='idkeluhan' value='"+ id +"'>" +
							  "<div class='card-header'> <b>" + obj[i]['topik_pesan'] + "</b></div>" +
							  "<div class='card-content card-content-padding'>"+ 
								  "<p class='date'>"+ obj[i]['tanggal_diterima'] +"</p>" +
								  "<p>"+ obj[i]['isi_pesan'] +"</p>" +
							  "</div>";


							if( obj[i]['identitas_klien'] == 'anonymous'){
								var iden = 'Tanpa Nama';
							}
							else{
								var iden = obj[i]['nama_lengkap'];
							}

							var dataklien = 
							"<input type='hidden' id='idklien' name='idklien' value='"+ obj[i]['id_klien'] +"'>" +
							  "<div class='card-header'> <b> DATA KLIEN </b></div>" +
							  "<div class='card-content card-content-padding'>"+ 
								  "<p> Nama lengkap: "+ iden +"</p>" +
								  "<p> No. KTP: "+ obj[i]['no_ktp'] +"</p>" +
								  "<p> Jenis Kelamin: "+ obj[i]['jenis_kelamin'] +"</p>" +
								  "<p> Tanggal Lahir: "+ obj[i]['tanggal_lahir'] +"</p>" +
								  "<p> Alamat: "+ obj[i]['alamat'] +"</p>" +
								  "<p> No. Telp: "+ obj[i]['no_telp'] +"</p>" +
								  "<p> Email: "+ obj[i]['email'] +"</p>" +
							  "</div>";

							$$('#datakeluhan').html(datakeluhan);
							$$('#dataklien').html(dataklien);
						}
					});
					
					if(tipe === 'keluhanmasuk') {
						$$('#listkeluhan').html('<div class="left" di><a href="/daftarkeluhan/" class="link icon-only"><i class="icon f7-icons">chevron_left</i></a></div>');
						$$('#btnkrmkonselor').val('Kirim');
						$$('#judul').html('Keluhan Admin');
						if (kategori === 'admin'){
							$$('#kons').hide();
							app.request.post("http://192.168.1.8:280/ecurhat/konselor.php", {}, function(data){						
								var result = JSON.parse(data);
								// console.log(data);
								var combo1 = "<li class='item-content item-input'>" +
										"<div class='item-inner'>" +
					                      	"<div class='item-title item-label'>Konselor untuk keluhan</div>" +
						                    "<div class='item-input-wrap'>" +
						                        "<select id='selectpickerpegawai' name='selectpickerpegawai' placeholder='Mohon Pilih...' class='konselorkeluhan'>" +
						                        	"<option value=''>--------------------Pilih-------------------------------------------</option>" +
						                        "</select>"
											"</div>"
										"</div>"
									"</li>";
								$$('#adm').append(combo1);

								for (var i = 0; i < result.length; i++) {
									var str = "<option value='" + result[i]['idpegawai'] + "'>"+ result[i]['nama_pegawai'] + ", " + result[i]['jabatan'] +"</option>";
												
									$$('#selectpickerpegawai').append(str);
								}
							});

							app.request.post("http://192.168.1.8:280/ecurhat/masalah.php", {}, function(data){						
								var combo2 = "<br>" +
									"<li class='item-content item-input'>" +
										"<div class='item-inner'>" +
					                      	"<div class='item-title item-label'>Kategori Masalah untuk keluhan</div>" +
						                    "<div class='item-input-wrap'>" +
						                        "<select id='selectpickermasalah' name='selectpickermasalah' placeholder='Mohon Pilih...' class='masalahkeluhan'>" +
						                          "<option value=''>--------------------Pilih-------------------------------------------</option>" +
						                         "</select>" +
											"</div>" +
										"</div>" +
									"</li>" +
									"<br>";
								$$('#adm').append(combo2);

								var result = JSON.parse(data);
								for (var i = 0; i < result.length; i++) {
									var str = "<option value='" + result[i]['masalah'] + "'>"+ result[i]['masalah'] +"</option>";
												
									$$('#selectpickermasalah').append(str);
								} 
							});
						}
						else if (kategori === 'konselor') {
							$$('#judul').html('Keluhan Konselor');
							$$('#adm').hide();
						}
						$$('#listkeluhan').html('<div class="left" di><a href="/daftarkeluhan/" class="link icon-only"><i class="icon f7-icons">chevron_left</i></a></div>');
					}
					else if(tipe === 'konfirmasichat') {
						app.request.post("http://192.168.1.8:280/ecurhat/viewkeluhanwithpegawai.php?id="+id, {}, function(data){
							var obj = JSON.parse(data);
							for (var i = 0; i < obj.length; i++) {						
								var datakonselor = 
									"<input type='hidden' id='idpegawai' name='idpegawai' value='"+ obj[i]['idpegawai'] +"'>" +
									  "<div class='card-header'> <b> DATA PEGAWAI </b></div>" +
									  "<div class='card-content card-content-padding'>"+ 
										  "<p> Nama lengkap: "+ obj[i]['nama_pegawai'] +"</p>" +
										  "<p> Jenis Kelamin: "+ obj[i]['jenis_kelamin'] +"</p>" +
										  "<p> Tanggal Lahir: "+ obj[i]['tanggal_lahir'] +"</p>" +
										  "<p> Pendidikan Terakhir: "+ obj[i]['pendidikan_terakhir'] +"</p>" +
										  "<p> Jabatan: "+ obj[i]['jabatan'] +"</p>" +
									  "</div>";

								$$('#datakonselor').html(datakonselor);
							}
						});

						$$('#listkeluhan').html('<div class="left" di><a href="/daftarkonfirmasichat/" class="link icon-only"><i class="icon f7-icons">chevron_left</i></a></div>');
						$$('#judul').html('Daftar Konfirmasi Admin');
						$$('#btnkrmkonselor').val('Buatkan Chat');
						$$('#adm').hide();
						$$('#kons').hide();
					}

					$$('#btnkrmkonselor').on('click', function(){
						var x = new FormData($$('#view-keluhan')[0]);
						var prioritas = $$('#selectpickerprioritas').val();
						var penanggap = $$('#selectpickerpenanggap').val();
						var bentuk = $$('#selectpickerbentuktanggapan').val();
						var pegawai = $$('#selectpickerpegawai').val();
						var masalah = $$('#selectpickermasalah').val();
						var keluhan_id = $$('#keluhan_id').val();

						if(tipe == 'keluhanmasuk'){
							if (kategori === 'admin') {
								if (prioritas != '' && penanggap != ''  && pegawai != '' && masalah != '' ) {
									app.dialog.confirm('Apakah anda yakin ingin mengirim keluhan ini kepada konselor?', function () {
										
										app.request.post('http://192.168.1.8:280/ecurhat/updatekeluhan.php',
											{prioritas,penanggap,pegawai,masalah,keluhan_id, tipe,kategori}, function(data){
											var res = data;
											app.dialog.alert(res);
										});
										page.router.navigate('/daftarkeluhan/');;
									});
								}
								else{
									app.dialog.alert('Mohon lengkapi data sebelum dikirim ke konselor.');
								}
							}
							else if (kategori === 'konselor'){
								if (bentuk != '') {
									console.log(kategori);
									app.dialog.confirm('Apakah anda yakin ingin mengirim keluhan ini kepada konselor?', function () {
										app.request.post('http://192.168.1.8:280/ecurhat/updatekeluhan.php',
											{bentuk, keluhan_id, tipe,kategori}, function(data){
											var res = data;
											app.dialog.alert(res);
										});
										page.router.navigate('/daftarkeluhan/');
									});
								}
								else{
									app.dialog.alert('Mohon lengkapi data sebelum dikirim ke admin.');
								}
							}
						}
						else if (tipe === 'konfirmasichat'){
							app.dialog.confirm('Apakah anda yakin ingin membuatkan chat?', function () {
								app.request.post('http://192.168.1.8:280/ecurhat/updatekeluhan.php',
									{keluhan_id, tipe,kategori}, function(data){
									var res = data;
									app.dialog.alert(res);
								});
								page.router.navigate('/daftarkeluhan/');
							});
						}
					}); 

					$$("#btnbtlkkrmkonselor").on('click', function(){
						app.dialog.confirm('Apakah anda yakin ingin membatalkan konfirmasi keluhan ini?', function () {
						    page.router.navigate('/daftarkeluhan/');
						  });
					});	
				}
			}
		},
		{
			path: '/tambahkategori/',
			url: 'tambahkategori.html',
			on:{
				pageInit: function(e, page){
					app.panel.disableSwipe();


					var autocompleteDropdownAll = app.autocomplete.create({
					  inputEl: '#kategori_masalah',
					  openIn: 'dropdown',
					  source: function (query, render) {
					    var results = [];
					    // Find matched items
					    app.request.post('http://192.168.1.8:280/ecurhat/masalah.php', function(data){
							var obj = JSON.parse(data);
							for (var i = 0; i < obj.length; i++) {
						      if (obj[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(obj[i]);
						    }
						});
					     render(results);
					  }
					});

					$$("#btnkrmkategori").on('click', function(){
						var x = new FormData($$('.kategori')[0]);
				       								
						app.request.post('http://192.168.1.8:280/ecurhat/insertkategori.php', 
						x, function(data){
							app.dialog.alert(data);
						
						});
					});
					//sebenarnya ada 5 tapi yang diajarkan hanya 3
				},
			}
		},
		{
			path: '/pesan/',
			url: 'pesan.html',
			on:{
				pageInit: function(e, page){
					app.panel.disableSwipe();
					username = localStorage.username;
					status = localStorage.kategori;
					tipehal = 'pesan';
					localStorage.tipehal = tipehal;

					app.request.post('http://192.168.1.8:280/ecurhat/pesan.php',{username, status, tipehal}, function(data){
						var obj = JSON.parse(data);
						// console.log(data);
						for (var i = 0; i < obj.length; i++) {
							var idroom = obj[i]['id_keluhan'];
							var idpegawai = obj[i]['idpegawai'];
							var idklien = obj[i]['klien_id_klien'];
							var namaklien = obj[i]['nama_lengkap'];
							var namapegawai = obj[i]['nama_pegawai'];
							// console.log(namaklien);
							if (kategori == 'klien') {
								var chatting = 
								"<li> "+
            						"<a href='/chat/"+ idroom +"'class='item-link item-content'>" +
              							"<div class='item-inner'>" +
                							"<div class='item-title-row'" +
                  								"<div class='item-title'>Pesan dari "+ namapegawai +"</div>" +
               								"</div>" +
              							"</div>" +
            						"</a>"
          						"</li>";

          						$$("#msg").append(chatting);
							}

							if (kategori == 'konselor'){
								var chatting = 
								"<li> "+
            						"<a href='/chat/"+ idroom +"' class='item-link item-content'>" +
              							"<div class='item-inner'>" +
                							"<div class='item-title-row'" +
                  								"<div class='item-title'>"+ namaklien +"</div>" +
               								"</div>" +
              							"</div>" +
            						"</a>"
          						"</li>";
          						$$("#msg").append(chatting);
							}
						}
					});
				},
			}
		},
		{
			path: '/chat/:idroom',
			url: 'chat.html',
			on:{
				pageInit: function(e, page){
					app.panel.disableSwipe();
					var id = page.router.currentRoute.params.idroom;
					
					username = localStorage.username;
					status = localStorage.kategori;
					tipehal = 'chat';
					localStorage.tipehal = tipehal;
					// $$("#sendchat").hide();

					app.request.post('http://192.168.1.8:280/ecurhat/pesan.php',{username, status, tipehal}, function(data){
						console.log(data);
						var obj = JSON.parse(data);
						for (var i = 0; i < obj.length; i++) {
							var idroom = obj[i]['id_keluhan'];
							var idpegawai = obj[i]['pegawai_idpegawai'];
							var idklien = obj[i]['klien_id_klien'];
							var namaklien = obj[i]['nama_lengkap'];
							var namapegawai = obj[i]['nama_pegawai'];
							
							if (status == 'klien') {
								app.request.post('http://192.168.1.8:280/ecurhat/readchat.php',{status,idpegawai,idroom,idklien},function(data){
									var objct = JSON.parse(data);
									for (var i = 0; i < objct.length; i++) {
										var sndmsg = 
										"<div class='message-content'>" +
									      "<div class='message-bubble'>" +
									        "<div class='message-text'>"+ objct[i]['isi_chat'] +"</div>" +
									      "</div>" +
									    "</div>";

									    $$("#namakontak").append(objct[i]['namakons']);
								   		$$("#receivedchat").append(sndmsg);
							   		}
								});
							}

							if (status == 'konselor'){
								app.request.post('http://192.168.1.8:280/ecurhat/readchat.php',{status,idpegawai,idroom,idklien},function(data){
									var objct = JSON.parse(data);
									// console.log(data);
									for (var i = 0; i < objct.length; i++) {
										var sndmsg = 
										"<div class='message-content'>" +
									      "<div class='message-bubble'>" +
									        "<div class='message-text'>"+ objct[i]['isi_chat'] +"</div>" +
									      "</div>" +
									    "</div>";

									    $$("#namakontak").append(objct[i]['namaklien']);
								   		$$("#receivedchat").append(sndmsg);
							   		}
								});
							}
						}
					});


					$$("#btnkrmpesan").on('click', function(){
						var teks = $$("#msgtxt").val();
				       	// app.dialog.alert(teks);						
						app.request.post('http://192.168.1.8:280/ecurhat/sendchat.php',{username, status,teks,id}, function(data){
							// console.log(data);
							// if(data == 'berhasil'){
								// app.dialog.alert(teks);
								var sndmsg = 
									"<div class='message-content'>" +
								      "<div class='message-bubble'>" +
								        "<div class='message-text'>"+ teks +"</div>" +
								      "</div>" +
								    "</div>";

							   $$("#sendchat").append(sndmsg);
							// }
						});
					});
				},
			}
		},
		{
			path: '/daftarprogress/',
			url: 'daftarprogress.html',
			on:{
				pageInit: function(e, page){
					app.panel.disableSwipe();
					username = localStorage.username;
					status = localStorage.kategori;
					tipehal = "daftarprogress";
					localStorage.tipehal = tipehal;

					app.request.post('http://192.168.1.8:280/ecurhat/showlistkeluhan.php', {username, status, tipehal} , function(data){
					var obj = JSON.parse(data);
						for (var i = 0; i < obj.length; i++) {
							var str = 
							"<li>" +
			                  "<a href='/progresskeluhan/"+ obj[i]['id_keluhan'] +"' class='item-link item-content'>" +
			                    "<div class='item-inner'>" +
			                      "<div class='item-title-row'>" +
			                        "<div class='item-title'>"+ obj[i]['topik_pesan'] +"</div>" +
			                        "<div class='item-after'>"+ obj[i]['tanggal_diterima'] +"</div>" +
			                      "</div>" +
			                      "<div class='item-text'>" + obj[i]['isi_pesan'] + "</div>"
			                    "</div>" +
			                  "</a>" +
			                "</li>";
			                $$('#daftarprogress').append(str);
						}
					});
				},
			}
		},
		{
			path: '/progresskeluhan/:idkeluhan',
			url: 'progresskeluhan.html',
			on:{
				pageInit: function(e, page){
					app.panel.disableSwipe();
					var id = page.router.currentRoute.params.idkeluhan;
					tipehal = 'progresskeluhan';
					localStorage.tipehal = tipehal;
					username = localStorage.username;
					kategori = localStorage.kategori;
					
					$$("#lastidkeluhan").html("<h5>ID Keluhan: "+ id +"</h5>");
					var id_keluhan = "<input type='hidden' name='keluhan_id' id='keluhan_id' value='"+ id +"'>";
					$$('#idkeluhan').html(id_keluhan);

					// app.request.post('http://192.168.1.8:280/ecurhat/viewkeluhan.php', {id} , function(data){
					// 	var obj = JSON.parse(data);
					// 	for (var i = 0; i < obj.length; i++) {
					// 		var namaklien = [obj][i]['nama_lengkap'];
					// 		var strng = "<h5>ID Keluhan: "+ id +"</h5>" + "<br>" + "<h5> Nama Klien: " + namaklien + "</h5>";
					// 	$$("#lastidkeluhan").html();
					// 	app.dialog.alert(namaklien);
					// 	}
					// });
					$$('#btnkrmprogress').on('click', function(){
						var x = new FormData($$('.progresskeluhan')[0]);
						app.request.post('http://192.168.1.8:280/ecurhat/insertprogress.php',x,function(data){
							app.dialog.alert(data);
						});
					});
				},
			}
		},
		{
			path: '/profil/',
			url: 'profil.html',
			on:{
				pageInit: function(e, page){
					app.panel.disableSwipe();
					//sebenarnya ada 5 tapi yang diajarkan hanya 3
				},
			}
		},
		{
			path: '/editprofil/',
			url: 'editprofil.html',
			on:{
				pageInit: function(e, page){
					app.panel.disableSwipe();
					$$('#btnBatal').on('click', function(){
						page.router.navigate('/profil/');
					});
				}
			}
		},
		{
			path: '/notifikasi/',
			url: 'notifikasi.html',
			on:{
				pageInit: function(e, page){
					app.panel.disableSwipe();
					$$('#btnBatal').on('click', function(){
						page.router.navigate('/profil/');
					});
				}
			}
		},
		{
			path: '/historykeluhan/',
			url: './historykeluhan.html',
			on:{
				pageInit: function(e, page){
					app.panel.disableSwipe();
					$$('#btnBatal').on('click', function(){
						page.router.navigate('/profil/');
					});
				}
			}
		},
		{
			path: '/tambahkonselor/',
			url: 'tambahkonselor.html',
			on:{
				pageInit: function(e, page){
					app.panel.disableSwipe();
					$$('#btntambahpegawai').on('click', function(){
						var x = new FormData($$('.tambahkonselor')[0]);
				       								
						app.request.post('http://192.168.1.8:280/ecurhat/registeruser.php', 
						x, function(data){							
							app.dialog.alert('Akun Konselor berhasil terdaftar');
							page.router.navigate('/berandabackend/');
						});
					});
				}
			}
		}
	]
});


var mainView = app.views.create('.view-main', {
	url: '/berandabackend/'
});

function terimaPesan(penerima){
	app.request.post()
}