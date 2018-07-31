/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 30 07 2018
 * Time: 8:54 PM
 */
import {Request} from 'express'

function getFullUrl(req: Request, url: string) {
    if(!url){
        return ('')
    }else {
        return (req.protocol+'://'+req.get('host')+'/ShopOpen/v1/'+url)
    }
}

export {getFullUrl}
