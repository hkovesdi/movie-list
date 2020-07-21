<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username', 'email', 'avatar', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function userMovies()
    {
        return $this->hasMany('App\UserMovie');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function incomingFriendRequests() {
        return $this->hasMany('App\FriendRequest', 'receiver_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function outgoingFriendRequests() {
        return $this->hasMany('App\FriendRequest', 'sender_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function friends() {
        return $this->incomingFriendRequests()->where('accepted', 1)->sender()->get()->merge($this->outgoingFriendRequests()->where('accepted', 1)->receiver()->get());
    }
}
