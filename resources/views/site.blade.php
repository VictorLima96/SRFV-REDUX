@extends('padrao')
@section('content')

          <!-- ***** Banner Start ***** -->
          <div class="main-banner">
            <div class="row">
              <div class="col-lg-7">
                <div class="header-text">
                  <h6>Bem-Vindo ao SRFV Games</h6>
                  <h4><em>Jogo em Destaque</em> Resident Evil 3 - Nemesis </h4>
                  <div class="main-button">
                    <a href="/abaResident" target="_blank">Jogue Agora</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- ***** Banner End ***** -->

          <!-- ***** Most Popular Start ***** -->
          <div class="most-popular">
            <div class="row">
              <div class="col-lg-12">
                <div class="heading-section">
                  <h4><em>Artes Populares</em> Agora</h4>
                </div>
                <div class="row">
                  <div class="col-lg-3 col-sm-6">
                    <div class="item">
                        <img src="{{ asset('assets/arts/a.png') }}" alt="">
                      <div class="hover-effect">
                      </div>
                      <a href="assets/arts/a.png" download><i class="fa fa-download"></i></a>
                      <h4>Bumblebee<br><span>By FalleN</span></h4>
                      <ul>
                        <li><i class="fa fa-star"></i> 4.1</li>
                        <li><i class="fa fa-download"></i> 242</li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-lg-3 col-sm-6">
                    <div class="item">
                      <img src="assets/arts/b.webp" alt="">
                      <a href="assets/arts/b.webp" download><i class="fa fa-download"></i></a>
                      <h4>Bomberman<br><span>By Victor</span></h4>
                      <ul>
                        <li><i class="fa fa-star"></i> 4.4</li>
                        <li><i class="fa fa-download"></i> 1.132</li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-lg-3 col-sm-6">
                    <div class="item">
                      <img src="assets/arts/e.webp" alt="">
                      <a href="assets/arts/e.webp" download><i class="fa fa-download"></i></a>
                      <h4>Bob Esponja<br><span>By Steam-X</span></h4>
                      <ul>
                        <li><i class="fa fa-star"></i> 4.8</li>
                        <li><i class="fa fa-download"></i> 346</li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-lg-3 col-sm-6">
                    <div class="item">
                      <img src="assets/arts/c.webp" alt="">
                      <a href="assets/arts/c.webp" download><i class="fa fa-download"></i></a>
                      <h4>Polygoth<br><span>By Legendary</span></h4>
                      <ul>
                        <li><i class="fa fa-star"></i> 4.9</li>
                        <li><i class="fa fa-download"></i> 738</li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-lg-3 col-sm-6">
                    <div class="item">
                      <img src="assets/arts/k.webp" alt="">
                      <a href="assets/arts/k.webp" download><i class="fa fa-download"></i></a>
                      <h4>Knuckles<br><span>By CrashGamis</span></h4>
                      <ul>
                        <li><i class="fa fa-star"></i> 3.9</li>
                        <li><i class="fa fa-download"></i> 2.323</li>
                      </ul>
                    </div>
                  </div>
                        <div class="col-lg-3 col-sm-6">
                          <div class="item">
                            <img src="assets/arts/m.webp" alt="">
                            <a href="assets/arts/m.webp" download><i class="fa fa-download"></i></a>
                            <h4>Luigi<br><span>By ElTopoGira</span></h4>
                            <ul>
                              <li><i class="fa fa-star"></i> 4.2</li>
                              <li><i class="fa fa-download"></i>9.471</li>
                            </ul>
                          </div>
                        </div>
                  <div class="col-lg-3 col-sm-6">
                    <div class="item">
                      <img src="assets/arts/n.webp" alt="">
                      <a href="assets/arts/n.webp" download><i class="fa fa-download"></i></a>
                      <h4>Pizza Tower<br><span>By Max 3D</span></h4>
                      <ul>
                        <li><i class="fa fa-star"></i> 3.1</li>
                        <li><i class="fa fa-download"></i> 1.120</li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-lg-3 col-sm-6">
                    <div class="item">
                      <img src="assets/arts/s.webp" alt="">
                      <a href="assets/arts/s.webp" download><i class="fa fa-download"></i></a>
                      <h4>Shadow<br><span>By FonSekito</span></h4>
                      <ul>
                        <li><i class="fa fa-star"></i> 4.1</li>
                        <li><i class="fa fa-download"></i> 329</li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="main-button">
                      <a href="/art1">Veja Mais Artes</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- ***** Most Popular End ***** -->

          <!-- ***** Gaming Library Start ***** -->
          <div class="gaming-library">
            <div class="col-lg-12">
              <div class="heading-section">
                <h4><em>Games em</em> Destaque</h4>
              </div>
              <div class="item">
                <ul>
                  <li><img src="assets/images/ms.jpg" alt="" class="templatemo-item"></li>
                  <li><h4>Metal Slug</h4><span>Shooter 2D</span></li>
                  <li><h4>Lançamento</h4><span>24/08/2007</span></li>
                  <li><h4>Criado por</h4><span>Victor Lima</span></li>
                  <li><h4>Empresa</h4><span>Konami</span></li>
                  <li><div class="main-border-button"><a href="/abaMetal" target="_blank">Jogue</a></div></li>
                </ul>
              </div>
              <div class="item">
                <ul>
                  <li><img src="assets/images/cr.webp" alt="" class="templatemo-item"></li>
                  <li><h4>Crash Racing</h4><span>Corrida</span></li>
                  <li><h4>Lançamento</h4><span>12/01/2001</span></li>
                  <li><h4>Criado por</h4><span>FbKnor</span></li>
                  <li><h4>Empresa</h4><span>Naugthy Dog</span></li>
                  <li><div class="main-border-button"><a href="/abaCrash" target="_blank">Jogue</a></div></li>
                </ul>
              </div>
              <div class="item last-item">
                <ul>
                  <li><img src="assets/images/te.webp" alt="" class="templatemo-item"></li>
                  <li><h4>Tekken 3</h4><span>Luta</span></li>
                  <li><h4>Lançamento</h4><span>14/11/1998</span></li>
                  <li><h4>Criado por</h4><span>Nagazaki Hiroshi</span></li>
                  <li><h4>Empresa</h4><span>Capcom</span></li>
                  <li><div class="main-border-button"><a href="/abaTekken" target="_blank">Jogue</a></div></li>
                </ul>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="main-button">
                <a href="/games1">Veja mais Games</a>
              </div>
            </div>
          </div>
          <!-- ***** Gaming Library End ***** -->
          <div class="most-popular">
            <div class="row">
              <div class="col-lg-12">
                <div class="heading-section">
                  <h4><em>Filmes em Destaque</em> Destaque</h4>
                </div>
                <div class="row">
                  <div class="col-lg-3 col-sm-6">
                    <div class="item">
                      <img src="assets/movies/d.png" alt="">
                      <h4>Donnie Darko<br><span>Pandora</span></h4>
                      <ul>
                        <li><i class="fa fa-star"></i> 5.0</li>
                        <a href="/abaDonnie" target="_blank"><i class="fa fa-play"></i></a>
                      </ul>
                    </div>
                  </div>
                  <div class="col-lg-3 col-sm-6">
                    <div class="item">
                      <img src="assets/movies/c.png" alt="">
                      <h4>Crash: o Filme<br><span>Sony</span></h4>
                      <ul>
                        <li><i class="fa fa-star"></i> 5.0</li>
                        <a href="/abaCrashM" target="_blank"><i class="fa fa-play"></i></a>
                      </ul>
                    </div>
                  </div>
                  <div class="col-lg-3 col-sm-6">
                    <div class="item">
                      <img src="assets/movies/t.jpg" alt="">
                      <h4>Tekken<br><span>Crystal Sky Pictures</span></h4>
                      <ul>
                        <li><i class="fa fa-star"></i> 2.8</li>
                        <a href="/abaTekkenM" target="_blank"><i class="fa fa-play"></i></a>
                      </ul>
                    </div>
                  </div>
                  <div class="col-lg-3 col-sm-6">
                    <div class="item">
                      <img src="assets/movies/s.jpg" alt="">
                      <h4>Homem Aranha: lótus<br><span>GJK</span></h4>
                      <ul>
                        <li><i class="fa fa-star"></i> 3.8</li>
                        <a href="/abaSpider" target="_blank"><i class="fa fa-play"></i></a>
                      </ul>
                    </div>
                  </div>
                  <div class="col-lg-3 col-sm-6">
                    <div class="item">
                      <img src="assets/movies/p.png" alt="">
                      <h4>Jogador nº 1<br><span>Discovery Global</span></h4>
                      <ul>
                        <li><i class="fa fa-star"></i> 4.9</li>
                        <a href="/abaJogador" target="_blank"><i class="fa fa-play"></i></a>
                      </ul>
                    </div>
                  </div>
                        <div class="col-lg-3 col-sm-6">
                          <div class="item">
                            <img src="assets/movies/r.jpg" alt="">
                            <h4>Resident Evil<br><span>Viacom</span></h4>
                            <ul>
                              <li><i class="fa fa-star"></i> 3.0</li>
                              <a href="/abaResidentM" target="_blank"><i class="fa fa-play"></i></a>
                            </ul>
                          </div>
                        </div>
                  <div class="col-lg-3 col-sm-6">
                    <div class="item">
                      <img src="assets/movies/m.webp" alt="">
                      <h4>Super Mario Bros<br><span>Illumination</span></h4>
                      <ul>
                        <li><i class="fa fa-star"></i> 1.8</li>
                        <a href="/abaMario" target="_blank"><i class="fa fa-play"></i></a>
                      </ul>
                    </div>
                  </div>
                  <div class="col-lg-3 col-sm-6">
                    <div class="item">
                      <img src="assets/movies/s.webp" alt="">
                      <h4>Sonic 2: o filme<br><span>Paramount Pictures</span></h4>
                      <ul>
                        <li><i class="fa fa-star"></i> 5.0</li>
                        <a href="/abaSonic" target="_blank"><i class="fa fa-play"></i></a>
                      </ul>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="main-button">
                      <a href="/movies1">Veja mais Filmes</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
                 <!-- ***** Start Stream Start ***** -->
                 <div class="start-stream">
                  <div class="col-lg-12">
                    <div class="heading-section">
                      <h4><em>Como funciona</em> o Site</h4>
                    </div>
                    <div class="row">
                      <div class="col-lg-4">
                        <div class="item">
                          <div class="icon">
                            <img src="assets/images/service-01.jpg" alt="" style="max-width: 60px; border-radius: 50%;">
                          </div>
                          <h4>Jogue Gratuitamente</h4>
                          <p>A SRFV Games é o melhor site para você poder se divertir, e jogar.</p>
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="item">
                          <div class="icon">
                            <img src="assets/images/service-02.jpg" alt="" style="max-width: 60px; border-radius: 50%;">
                          </div>
                          <h4>Filmes Online</h4>
                          <p>A SRFV Games além dos jogos, você poderá assistir aos melhores filmes.</p>
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="item">
                          <div class="icon">
                            <img src="assets/images/service-03.jpg" alt="" style="max-width: 60px; border-radius: 50%;">
                          </div>
                          <h4>Artes da Comunidade</h4>
                          <p>Confira as artes da nossa incrivel comunidade do Discord.</p>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="main-button">
                          <a href="{{route('login')}}">Cadastro/Login</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>




@endsection