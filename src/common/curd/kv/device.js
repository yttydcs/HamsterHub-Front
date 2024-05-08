
let template= [
    [
        {
            key:"path",
            require:"",
            text:{title:"path"},
        },
    ],
    [
        {
            key:"refreshToken",
            require:"",
            text:{title:"refreshToken"},
        },
    ],

];

export function createTemplate(obj){
    return template[obj.type];
}