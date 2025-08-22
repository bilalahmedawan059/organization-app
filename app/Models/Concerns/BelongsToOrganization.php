<?php

namespace App\Models\Concerns;

use App\Services\CurrentOrganization;
use Illuminate\Database\Eloquent\Builder;

trait BelongsToOrganization
{
    protected static function bootBelongsToOrganization(): void
    {
        static::addGlobalScope('org', function (Builder $q) {
            $orgId = app(CurrentOrganization::class)->id();
            if ($orgId) {
                $q->where($q->getModel()->getTable().'.organization_id', $orgId);
            }
        });

        static::creating(function ($model) {
            if (empty($model->organization_id)) {
                $model->organization_id = app(CurrentOrganization::class)->id();
            }
        });
    }
}

