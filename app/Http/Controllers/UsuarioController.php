<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UsuarioController extends Controller
{
    /**
     * Mapa de slugs para dados de iframe (url, largura, altura).
     */
    private const EMBEDS = [
        'tekken'       => ['url' => 'https://www.retrogames.cc/embed/40238-tekken-3.html', 'w' => 600,  'h' => 450],
        'crash'        => ['url' => 'https://www.retrogames.cc/embed/41687-crash-team-racing.html', 'w' => 600,  'h' => 450],
        'metal'        => ['url' => 'https://www.retrogames.cc/embed/9157-metal-slug-super-vehicle-001.html', 'w' => 600,  'h' => 450],
        'resident'     => ['url' => 'https://www.retrogames.cc/embed/42155-resident-evil-3-nemesis-u.html', 'w' => 600,  'h' => 450],
        'bubsy'        => ['url' => 'https://www.retrogames.cc/embed/42362-bubsy-3d-furbitten-planet.html', 'w' => 600,  'h' => 450],
        'fifa'         => ['url' => 'https://www.retrogames.cc/embed/17484-fifa-2000-usa.html', 'w' => 600,  'h' => 450],
        'tomb'         => ['url' => 'https://www.retrogames.cc/embed/42724-tomb-raider-2.html', 'w' => 600,  'h' => 450],
        'street'       => ['url' => 'https://www.retrogames.cc/embed/9966-street-fighter-alpha-2-960306-usa.html', 'w' => 600,  'h' => 450],
        'cb3'          => ['url' => 'https://www.retrogames.cc/embed/40136-crash-bandicoot-warped.html', 'w' => 600,  'h' => 450],
        'tn2'          => ['url' => 'https://www.retrogames.cc/embed/42153-tony-hawks-pro-skater-2.html', 'w' => 600,  'h' => 450],
        'gt'           => ['url' => 'https://www.retrogames.cc/embed/41826-gran-turismo.html', 'w' => 600,  'h' => 450],
        'ff7'          => ['url' => 'https://www.retrogames.cc/embed/43658-final-fantasy-vii-usa-disc-1.html', 'w' => 600,  'h' => 450],
        'donnie'       => ['url' => 'https://www.youtube.com/embed/RPZTgNgsdIw?si=Y5CnC8T3gtrYjcWu', 'w' => 875,  'h' => 490],
        'crash-movie'  => ['url' => 'https://www.youtube.com/embed/KlShHE98AKw?si=5W5rxTdV3HteLLj6', 'w' => 875,  'h' => 490],
        'resident-movie' => ['url' => 'https://www.youtube.com/embed/KU-IPeBF8UE?si=vbGEv8YdiqDYjDpE', 'w' => 875,  'h' => 490],
        'jogador'      => ['url' => 'https://www.youtube.com/embed/JBThcJ2P3zY?si=ED8-7dypk0nGMjmM', 'w' => 875,  'h' => 490],
        'spider'       => ['url' => 'https://www.youtube.com/embed/mBrUx6M6R7U?si=b2SeDF0GTXiFtoMX', 'w' => 875,  'h' => 490],
        'sonic'        => ['url' => 'https://www.youtube.com/embed/A2SjVRziC7M?si=rIxMPEB4psNG1Q0k', 'w' => 875,  'h' => 490],
        'mario'        => ['url' => 'https://www.youtube.com/embed/lv7FPDR66Lk?si=W2OwleM6Z3qFGC4M', 'w' => 875,  'h' => 490],
        'tekken-movie' => ['url' => 'https://www.youtube.com/embed/LMevAl7i994?si=jyzM1dQvq0jRDoWu', 'w' => 875,  'h' => 490],
        'games'        => ['url' => 'https://www.retrogames.cc/embed/42155-resident-evil-3-nemesis-u.html', 'w' => 1280, 'h' => 720],
        'movies'       => ['url' => 'https://www.retrogames.cc/embed/40238-tekken-3.html', 'w' => 600,  'h' => 450],
    ];

    public function site()
    {
        return view('site');
    }

    public function showUsuario()
    {
        return view('signup');
    }

    public function storeUsuario(Request $request)
    {
        $usuario = $request->validate([
            'name'     => 'string|required',
            'password' => 'string|required',
            'email'    => 'string|required',
        ]);

        User::create($usuario);
        return Redirect::route('site');
    }

    public function showMovies()
    {
        return view('movies1');
    }

    public function showLogin()
    {
        return view('login');
    }

    public function destroy(User $id)
    {
        $id->delete();
        return Redirect::route('todos-usuario');
    }

    public function update(User $id, Request $request)
    {
        $usuario = $request->validate([
            'nomeUsuario'  => 'string|required',
            'senhaUsuario' => 'string|required',
            'emailUsuario' => 'string|required',
        ]);

        $id->fill($usuario);
        $id->save();
        return Redirect::route('todos-usuario');
    }

    public function showAlterar(User $id)
    {
        return view('alterar', ['user' => $id]);
    }

    public function showgames()
    {
        return view('games1');
    }

    public function showart()
    {
        return view('art1');
    }

    /**
     * Exibe qualquer aba de embed (game ou movie) pelo slug.
     */
    public function showEmbed(string $slug)
    {
        $embed = self::EMBEDS[$slug] ?? null;

        if (! $embed) {
            abort(404);
        }

        return view('abaEmbed', [
            'url'    => $embed['url'],
            'width'  => $embed['w'],
            'height' => $embed['h'],
        ]);
    }

    public function authenticate(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email'    => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->intended('login-acesso');
        }

        return back()->withErrors([
            'email' => 'As credenciais não correspondem.',
        ]);
    }
}
