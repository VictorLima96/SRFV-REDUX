@extends('padrao')
@section('content')

          <!-- ***** Featured Movies Start ***** -->
          <div class="row">
            <div class="col-lg-8 col-md-7">
              <div class="featured-games header-text">
                <div class="heading-section">
                  <h4><em>Filmes</em> Populares</h4>
                </div>
                <div class="owl-features owl-carousel">
                  <div class="item">
                    <div class="thumb">
                      <img src="{{ asset('assets/movies/d.png') }}" alt="">
                      <div class="hover-effect">
                        <a href="/abaDonnie"><h6>Assista Agora</h6></a>
                      </div>
                    </div>
                    <h4>Donnie Darko<br><span>Pandora</span></h4>
                    <ul>
                      <li><i class="fa fa-star"></i> 5.0</li>
                    </ul>
                  </div>
                  <div class="item">
                    <div class="thumb">
                      <img src="{{ asset('assets/movies/p.png') }}" alt="">
                      <div class="hover-effect">
                        <a href="/abaJogador"><h6>Assista Agora</h6></a>
                      </div>
                    </div>
                    <h4>Jogador nº1<br><span>Discovery Global</span></h4>
                    <ul>
                      <li><i class="fa fa-star"></i> 4.9</li>
                    </ul>
                  </div>
                  <div class="item">
                    <div class="thumb">
                      <img src="{{ asset('assets/movies/c.png') }}" alt="">
                      <div class="hover-effect">
                        <a href="/abaCrashM"><h6>Assista Agora</h6></a>
                      </div>
                    </div>
                    <h4>Crash: o Filme<br><span>Sony</span></h4>
                    <ul>
                      <li><i class="fa fa-star"></i> 5.0</li>
                    </ul>
                  </div>
                  <div class="item">
                    <div class="thumb">
                      <img src="{{ asset('assets/movies/s.webp') }}" alt="">
                      <div class="hover-effect">
                        <a href="/abaSonic"><h6>Assista Agora</h6></a>
                      </div>
                    </div>
                    <h4>Sonic 2: o Filme<br><span>Paramount Pictures</span></h4>
                    <ul>
                      <li><i class="fa fa-star"></i> 5.0</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-5">
              <div class="top-streamers">
                <div class="heading-section">
                  <h4><em>Criadores</em> do Site</h4>
                </div>
                <ul>
                  <li>
                    <span>01</span>
                    <img src="{{ asset('assets/images/vic.png') }}" alt="">
                    <h6><i class="fa fa-check"></i> Victor</h6>
                    <div class="main-button">
                      <a href="https://br.linkedin.com/in/victor-lima-da-silva-1a374b236" target="_blank">Seguir</a>
                    </div>
                  </li>
                  <li>
                    <span>02</span>
                    <img src="{{ asset('assets/images/ra.png') }}" alt="">
                    <h6><i class="fa fa-check"></i> Raphael</h6>
                    <div class="main-button">
                      <a href="https://www.youtube.com/@manoloeditsbr" target="_blank">Seguir</a>
                    </div>
                  </li>
                  <li>
                    <span>03</span>
                    <img src="{{ asset('assets/images/avatar-03.jpg') }}" alt="">
                    <h6><i class="fa fa-check"></i> Felipe</h6>
                    <div class="main-button">
                      <a href="https://www.youtube.com/@knoxmindovermatter" target="_blank">Seguir</a>
                    </div>
                  </li>
                  <li>
                    <span>04</span>
                    <img src="{{ asset('assets/images/sa.jfif') }}" alt="">
                    <h6><i class="fa fa-check"></i> Samuel</h6>
                    <div class="main-button">
                      <a href="https://www.youtube.com/@anjoaguiel6933" target="_blank">Seguir</a>
                    </div>
                  </li>
                  <li>
                    <span>05</span>
                    <img src="{{ asset('assets/images/silvio.jfif') }}" alt="">
                    <h6><i class="fa fa-check"></i> Silvio</h6>
                    <div class="main-button">
                      <a href="https://br.linkedin.com/in/silvio-florentino-90a8861b9" target="_blank">Seguir</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- ***** Featured Movies End ***** -->

          <!-- ***** All Movies Start ***** -->
          <div class="most-popular">
            <div class="row">
              <div class="col-lg-12">
                <div class="heading-section">
                  <h4><em></em> Todos os Filmes</h4>
                </div>
                <div class="row">
                  <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="item">
                      <img src="{{ asset('assets/movies/d.png') }}" alt="">
                      <h4>Donnie Darko<br><span>Pandora</span></h4>
                      <ul>
                        <li><i class="fa fa-star"></i> 5.0</li>
                        <li><a href="/abaDonnie" target="_blank"><i class="fa fa-play"></i></a></li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="item">
                      <img src="{{ asset('assets/movies/c.png') }}" alt="">
                      <h4>Crash: o Filme<br><span>Sony</span></h4>
                      <ul>
                        <li><i class="fa fa-star"></i> 5.0</li>
                        <li><a href="/abaCrashM" target="_blank"><i class="fa fa-play"></i></a></li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="item">
                      <img src="{{ asset('assets/movies/t.jpg') }}" alt="">
                      <h4>Tekken<br><span>Crystal Sky Pictures</span></h4>
                      <ul>
                        <li><i class="fa fa-star"></i> 2.8</li>
                        <li><a href="/abaTekkenM" target="_blank"><i class="fa fa-play"></i></a></li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="item">
                      <img src="{{ asset('assets/movies/s.jpg') }}" alt="">
                      <h4>Homem Aranha: lótus<br><span>GJK</span></h4>
                      <ul>
                        <li><i class="fa fa-star"></i> 3.8</li>
                        <li><a href="/abaSpider" target="_blank"><i class="fa fa-play"></i></a></li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="item">
                      <img src="{{ asset('assets/movies/p.png') }}" alt="">
                      <h4>Jogador nº 1<br><span>Discovery Global</span></h4>
                      <ul>
                        <li><i class="fa fa-star"></i> 4.9</li>
                        <li><a href="/abaJogador" target="_blank"><i class="fa fa-play"></i></a></li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="item">
                      <img src="{{ asset('assets/movies/r.jpg') }}" alt="">
                      <h4>Resident Evil<br><span>Viacom</span></h4>
                      <ul>
                        <li><i class="fa fa-star"></i> 3.0</li>
                        <li><a href="/abaResidentM" target="_blank"><i class="fa fa-play"></i></a></li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="item">
                      <img src="{{ asset('assets/movies/m.webp') }}" alt="">
                      <h4>Super Mario Bros<br><span>Illumination</span></h4>
                      <ul>
                        <li><i class="fa fa-star"></i> 1.8</li>
                        <li><a href="/abaMario" target="_blank"><i class="fa fa-play"></i></a></li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="item">
                      <img src="{{ asset('assets/movies/s.webp') }}" alt="">
                      <h4>Sonic 2: o filme<br><span>Paramount Pictures</span></h4>
                      <ul>
                        <li><i class="fa fa-star"></i> 5.0</li>
                        <li><a href="/abaSonic" target="_blank"><i class="fa fa-play"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- ***** All Movies End ***** -->

@endsection
