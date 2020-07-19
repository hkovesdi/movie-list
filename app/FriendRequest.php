<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property integer $sender_id
 * @property integer $receiver_id
 * @property boolean $accepted
 * @property string $created_at
 * @property string $updated_at
 * @property User $receiver
 * @property User $sender
 */
class FriendRequest extends Model
{
    /**
     * The "type" of the auto-incrementing ID.
     * 
     * @var string
     */
    protected $keyType = 'integer';

    /**
     * @var array
     */
    protected $fillable = ['sender_id', 'receiver_id', 'accepted', 'created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function receiver()
    {
        return $this->belongsTo('App\User', 'receiver_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function sender()
    {
        return $this->belongsTo('App\User', 'sender_id');
    }
}
