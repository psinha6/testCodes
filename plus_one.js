process.stdin.resume();

process.stdin.on('data', function(data){
var b;
try{
b = parseInt(data, 10);
b +=1;
process.stdout.write(b + '\n');
} catch (err){
	process.stderr.write('error' + err.message);
}
});
