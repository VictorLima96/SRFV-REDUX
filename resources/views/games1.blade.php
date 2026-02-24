@extends('padrao')
@section('content')

          <!-- ***** Featured Games Start ***** -->
          <div class="row">
            <div class="col-lg-8 col-md-7">
              <div class="featured-games header-text">
                <div class="heading-section">
                  <h4><em>Jogos</em> em Destaque</h4>
                </div>
                <div class="owl-features owl-carousel">
                  <div class="item">
                    <div class="thumb">
                      <img src="{{ asset('assets/images/cr.webp') }}" alt="">
                      <div class="hover-effect">
                        <a href="/abaCrash" target="_blank"><h6>Jogar Agora</h6></a>
                      </div>
                    </div>
                    <h4>CTR<br><span>Naughty Dog</span></h4>
                    <ul>
                      <li><i class="fa fa-star"></i> 5.0</li>
                    </ul>
                  </div>
                  <div class="item">
                    <div class="thumb">
                      <img src="{{ asset('assets/images/te.webp') }}" alt="">
                      <div class="hover-effect">
                        <a href="/abaTekken" target="_blank"><h6>Jogar Agora</h6></a>
                      </div>
                    </div>
                    <h4>Tekken 3<br><span>Bandai Namco</span></h4>
                    <ul>
                      <li><i class="fa fa-star"></i> 4.8</li>
                    </ul>
                  </div>
                  <div class="item">
                    <div class="thumb">
                      <img src="{{ asset('assets/images/ms.jpg') }}" alt="">
                      <div class="hover-effect">
                        <a href="/abaMetal" target="_blank"><h6>Jogar Agora</h6></a>
                      </div>
                    </div>
                    <h4>Metal Slug<br><span>Konami</span></h4>
                    <ul>
                      <li><i class="fa fa-star"></i> 4.4</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-5">
              <div class="top-downloaded">
                <div class="heading-section">
                  <h4><em>Melhores</em> Artes</h4>
                </div>
                <ul>
                  <li>
                    <img src="{{ asset('assets/arts/a.png') }}" alt="" class="templatemo-item">
                    <h4>Bumblebee</h4>
                    <h6>By Fallen</h6>
                    <span><i class="fa fa-star"></i> 4.1</span>
                    <span><i class="fa fa-download"></i> 242</span>
                    <div class="download">
                      <a href="{{ asset('assets/arts/a.png') }}" download><i class="fa fa-download"></i></a>
                    </div>
                  </li>
                </ul>
                <ul>
                  <li>
                    <img src="{{ asset('assets/arts/b.webp') }}" alt="" class="templatemo-item">
                    <h4>Bomberman</h4>
                    <h6>By Victor</h6>
                    <span><i class="fa fa-star"></i> 4.4</span>
                    <span><i class="fa fa-download"></i> 1.132</span>
                    <div class="download">
                      <a href="{{ asset('assets/arts/b.webp') }}" download><i class="fa fa-download"></i></a>
                    </div>
                  </li>
                </ul>
                <ul>
                  <li>
                    <img src="{{ asset('assets/arts/c.webp') }}" alt="" class="templatemo-item">
                    <h4>Polygoth</h4>
                    <h6>By Legendary</h6>
                    <span><i class="fa fa-star"></i> 4.9</span>
                    <span><i class="fa fa-download"></i> 738</span>
                    <div class="download">
                      <a href="{{ asset('assets/arts/c.webp') }}" download><i class="fa fa-download"></i></a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- ***** Featured Games End ***** -->

          <!-- ***** All Games Start ***** -->
          <div class="live-stream">
            <div class="col-lg-12">
              <div class="heading-section">
                <h4><em>Todos os</em> Jogos</h4>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="item">
                  <div class="thumb">
                    <img src="{{ asset('assets/images/cr.webp') }}" alt="">
                    <div class="hover-effect">
                      <div class="content">
                        <div class="live">
                          <a href="/abaCrash" target="_blank"><i class="fa fa-play"></i></a>
                        </div>
                        <ul>
                          <li><a href="#"><i class="fa fa-eye"></i> 2</a></li>
                          <li><a href="#"><i class="fa fa-gamepad"></i> CTR</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="down-content">
                    <div class="avatar">
                      <img src="{{ asset('assets/images/cr.webp') }}" alt="">
                    </div>
                    <span><i class="fa fa-check"></i> Naughty Dog</span>
                    <h4>Crash Team Racing</h4>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="item">
                  <div class="thumb">
                    <img src="{{ asset('assets/images/ms.jpg') }}" alt="">
                    <div class="hover-effect">
                      <div class="content">
                        <div class="live">
                          <a href="/abaMetal" target="_blank"><i class="fa fa-play"></i></a>
                        </div>
                        <ul>
                          <li><a href="#"><i class="fa fa-eye"></i> 2K</a></li>
                          <li><a href="#"><i class="fa fa-gamepad"></i> MS1</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="down-content">
                    <div class="avatar">
                      <img src="{{ asset('assets/images/ms.jpg') }}" alt="">
                    </div>
                    <span><i class="fa fa-check"></i> Konami</span>
                    <h4>Metal Slug 1</h4>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="item">
                  <div class="thumb">
                    <img src="{{ asset('assets/images/te.webp') }}" alt="">
                    <div class="hover-effect">
                      <div class="content">
                        <div class="live">
                          <a href="/abaTekken" target="_blank"><i class="fa fa-play"></i></a>
                        </div>
                        <ul>
                          <li><a href="#"><i class="fa fa-eye"></i> 3k</a></li>
                          <li><a href="#"><i class="fa fa-gamepad"></i> TKK3</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="down-content">
                    <div class="avatar">
                      <img src="{{ asset('assets/images/te.webp') }}" alt="">
                    </div>
                    <span><i class="fa fa-check"></i> Nanco</span>
                    <h4>Tekken 3</h4>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="item">
                  <div class="thumb">
                    <img src="{{ asset('assets/images/boob.png') }}" alt="">
                    <div class="hover-effect">
                      <div class="content">
                        <div class="live">
                          <a href="/abaBubsy" target="_blank"><i class="fa fa-play"></i></a>
                        </div>
                        <ul>
                          <li><a href="#"><i class="fa fa-eye"></i>1k</a></li>
                          <li><a href="#"><i class="fa fa-gamepad"></i> BOOB</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="down-content">
                    <div class="avatar">
                      <img src="{{ asset('assets/images/boob.png') }}" alt="">
                    </div>
                    <span><i class="fa fa-check"></i> Accolade</span>
                    <h4>Bubsy 3D</h4>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="item">
                  <div class="thumb">
                    <img src="{{ asset('assets/images/re33.png') }}" alt="">
                    <div class="hover-effect">
                      <div class="content">
                        <div class="live">
                          <a href="/abaResident" target="_blank"><i class="fa fa-play"></i></a>
                        </div>
                        <ul>
                          <li><a href="#"><i class="fa fa-eye"></i> 12k</a></li>
                          <li><a href="#"><i class="fa fa-gamepad"></i> RE3</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="down-content">
                    <div class="avatar">
                      <img src="{{ asset('assets/images/re33.png') }}" alt="">
                    </div>
                    <span><i class="fa fa-check"></i> Capcom</span>
                    <h4>Resident Evil 3</h4>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="item">
                  <div class="thumb">
                    <img src="{{ asset('assets/images/tom.png') }}" alt="">
                    <div class="hover-effect">
                      <div class="content">
                        <div class="live">
                          <a href="/abaTomb" target="_blank"><i class="fa fa-play"></i></a>
                        </div>
                        <ul>
                          <li><a href="#"><i class="fa fa-eye"></i> 7K</a></li>
                          <li><a href="#"><i class="fa fa-gamepad"></i> TR2</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="down-content">
                    <div class="avatar">
                      <img src="{{ asset('assets/images/tom.png') }}" alt="">
                    </div>
                    <span><i class="fa fa-check"></i> EIDOS</span>
                    <h4>Tomb Raider II</h4>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="item">
                  <div class="thumb">
                    <img src="{{ asset('assets/images/stree.webp') }}" alt="">
                    <div class="hover-effect">
                      <div class="content">
                        <div class="live">
                          <a href="/abaStreet" target="_blank"><i class="fa fa-play"></i></a>
                        </div>
                        <ul>
                          <li><a href="#"><i class="fa fa-eye"></i> 7K</a></li>
                          <li><a href="#"><i class="fa fa-gamepad"></i> SF2</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="down-content">
                    <div class="avatar">
                      <img src="{{ asset('assets/images/stree.webp') }}" alt="">
                    </div>
                    <span><i class="fa fa-check"></i> Capcom</span>
                    <h4>Street Fighter 2</h4>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="item">
                  <div class="thumb">
                    <img src="{{ asset('assets/images/fif.png') }}" alt="">
                    <div class="hover-effect">
                      <div class="content">
                        <div class="live">
                          <a href="/abaFifa" target="_blank"><i class="fa fa-play"></i></a>
                        </div>
                        <ul>
                          <li><a href="#"><i class="fa fa-eye"></i> 0</a></li>
                          <li><a href="#"><i class="fa fa-gamepad"></i> FIFA</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="down-content">
                    <div class="avatar">
                      <img src="{{ asset('assets/images/fif.png') }}" alt="">
                    </div>
                    <span><i class="fa fa-check"></i> EA SPORTS</span>
                    <h4>FIFA 2000</h4>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="item">
                  <div class="thumb">
                    <img src="{{ asset('assets/images/ff7.webp') }}" alt="">
                    <div class="hover-effect">
                      <div class="content">
                        <div class="live">
                          <a href="/abaFf7" target="_blank"><i class="fa fa-play"></i></a>
                        </div>
                        <ul>
                          <li><a href="#"><i class="fa fa-eye"></i> 1.4k</a></li>
                          <li><a href="#"><i class="fa fa-gamepad"></i> FF7</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="down-content">
                    <div class="avatar">
                      <img src="{{ asset('assets/images/ff7.webp') }}" alt="">
                    </div>
                    <span><i class="fa fa-check"></i> Square</span>
                    <h4>Final Fantasy 7</h4>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="item">
                  <div class="thumb">
                    <img src="{{ asset('assets/images/gran.jfif') }}" alt="">
                    <div class="hover-effect">
                      <div class="content">
                        <div class="live">
                          <a href="/abaGt" target="_blank"><i class="fa fa-play"></i></a>
                        </div>
                        <ul>
                          <li><a href="#"><i class="fa fa-eye"></i> 7K</a></li>
                          <li><a href="#"><i class="fa fa-gamepad"></i> GT1</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="down-content">
                    <div class="avatar">
                      <img src="{{ asset('assets/images/gran.jfif') }}" alt="">
                    </div>
                    <span><i class="fa fa-check"></i> Sony</span>
                    <h4>Gran Turismo</h4>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="item">
                  <div class="thumb">
                    <img src="{{ asset('assets/images/cs3.webp') }}" alt="">
                    <div class="hover-effect">
                      <div class="content">
                        <div class="live">
                          <a href="/abaCb3" target="_blank"><i class="fa fa-play"></i></a>
                        </div>
                        <ul>
                          <li><a href="#"><i class="fa fa-eye"></i> 4.1K</a></li>
                          <li><a href="#"><i class="fa fa-gamepad"></i> CB3</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="down-content">
                    <div class="avatar">
                      <img src="{{ asset('assets/images/cs3.webp') }}" alt="">
                    </div>
                    <span><i class="fa fa-check"></i> Naugthy Dog</span>
                    <h4>Crash Bandicoot 3</h4>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="item">
                  <div class="thumb">
                    <img src="{{ asset('assets/images/tn3.jpg') }}" alt="">
                    <div class="hover-effect">
                      <div class="content">
                        <div class="live">
                          <a href="/abaTn2" target="_blank"><i class="fa fa-play"></i></a>
                        </div>
                        <ul>
                          <li><a href="#"><i class="fa fa-eye"></i> 259</a></li>
                          <li><a href="#"><i class="fa fa-gamepad"></i> TH2</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="down-content">
                    <div class="avatar">
                      <img src="{{ asset('assets/images/tn3.jpg') }}" alt="">
                    </div>
                    <span><i class="fa fa-check"></i> Activision</span>
                    <h4>Tony Hawk 2</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- ***** All Games End ***** -->

@endsection
