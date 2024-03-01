<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UsuarioController extends Controller
{
    public function site(){
        return view('site');
    }

    public function showUsuario(){
        return view('signup');
    }
    

    public function storeUsuario(Request $request){
        
        
        $usuario = $request->validate([
            'name' => 'string|required',
            'password' => 'string|required',
            'email' => 'string|required',
        ]);
    
        User::Create($usuario); 
        return Redirect::route('site');
    }

    public function showMovies(){
        return view('movies1');
    }

    public function showLogin(){
        return view('login');
    }
        public function destroy(User $id){
            $id->delete();
            return redirect::route('todos-usuario');
        }

        public function update(User $id, Request $request){
            $usuario = $request->validate([
                'nomeUsuario' => 'string|required',
                'senhaUsuario' => 'string|required',
                'emailUsuario' => 'string|required'
            ]);

            $id->fill($usuario);
            $id->save();
            return Redirect::route('todos-usuario');
        }
        public function showAlterar(User $id){
            return view('alterar',['user'=>$id]);
        }
        public function showgames(){
            return view('games1');


        }
        public function showabatekken(){
            return view('abaTekken');
        }

        public function showabaresident(){
            return view('abaResident');
        }

        public function showababubsy(){
            return view('abaBubsy');
        }

        public function showabacrash(){
            return view('abaCrash');
        }

        public function showabacrashm(){
            return view('abaCrashM');
        }

        public function showabadonnie(){
            return view('abaDonnie');
        }

        public function showabafifa(){
            return view('abaFifa');
        }

        public function showabajogador(){
            return view('abaJogador');
        }

        public function showabamario(){
            return view('abaMario');
        }

        public function showabametal(){
            return view('abaMetal');
        }

        public function showabaresidentm(){
            return view('abaResidentM');
        }

        public function showabasonic(){
            return view('abaSonic');
        }

        public function showabastreet(){
            return view('abaStreet');
        }

        public function showabatekkenm(){
            return view('abaTekkenM');
        }

        public function showabatomb(){
            return view('abaTomb');
        }

        public function showart(){
            return view('art1');
        }
        
        public function showabaspider(){
            return view('abaSpider');
        }

        public function showabacb3(){
            return view('abaCb3');
        }

        public function showabaff7(){
            return view('abaFf7');
        }

        public function showabagt(){
            return view('abaGt');
        }

        public function showabatn2(){
            return view('abaTn2');
        }


    
    public function authenticate(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
 
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
 
            return redirect()->intended('login-acesso');
        }

    }

}
