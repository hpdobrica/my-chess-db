import { Platform } from "../games/entity";
import { Person } from "./entity";


export function getUsernameForPlatform(person: Person, platform: Platform) {
    if(platform === Platform.CHESS_COM) {
        return person.chessComProfile.username
    }

    if(platform === Platform.LICHESS) {
        return person.lichessProfile.username
    }

    if(platform === Platform.OTB) {
        return person.otbProfile.username
    }
}