<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Services\CurrentOrganization;

class SetPermissionsTeamFromCurrentOrg
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
         $orgId = app(CurrentOrganization::class)->id();
        // Inform Spatie which team/org is active for this request:
        if (! is_null($orgId)) {
            setPermissionsTeamId($orgId);
        }
        return $next($request);
    }
}
