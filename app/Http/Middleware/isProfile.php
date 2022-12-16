<?php

namespace App\Http\Middleware;

use App\Models\Profile;
use Closure;
use Illuminate\Http\Request;

class isProfile
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $prfoile = Profile::where('user_id', auth()->user()->id)->get();
        if (count($prfoile) == 0) {
            // dd($prfoile);
            return redirect()->route('profile');
        } else {
            return $next($request);
        }
        return $next($request);
    }
}
