Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera=document.getElementById("camera");

Webcam.attach('camera');

function takesnapshot()
{
    Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML='<img src="'+data_uri+'" id="captured_image">';});
}

console.log('ml5version',ml5.version);

Classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/4egdVUbcW/model.json',modelLoaded);
function modelLoaded()
{
    console.log('modelLoaded');
}

function check()
{
    img=document.getElementById("captured_image");
    Classifier.classify(img,gotResult);
}

function gotResult(error,results)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(results);
        document.getElementById("result_object_name").innerHTML=results[0].label;
        document.getElementById("result_object_accuracy").innerHTML=results[0].confidence.toFixed(3);
    }
}