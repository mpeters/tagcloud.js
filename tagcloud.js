/**************************************************************
TagCloud - create a simple HTML tagcloud from a JSON
structure.

    new TagCloud({
        target   : 'element_id',
        template : '<span style="font-size: #{size}">#{tag}</span>',
        data     : some_json_structure
    });
**************************************************************/
function TagCloud (args) {
    this.args = args;
    if(!args.template) args.template = '<span style="font-size: #{size}">#{tag}</span>';
    if(!args.min_size) args.min_size = .5;
    if(!args.max_size) args.max_size = 2;

    // get the total and average value
    var total = 0;
    var count = 0;
    for(var key in args.data) {
        total += (args.data[key] - 0);
        count++;
    }
    var avg = count ? total / count : 0;

    // a simple function that will render the template string given the values
    // I have #{count} #{thing}
    // and are filled with a hash like { count: 10, thing : 'cookies' }
    var template  = args.template;
    var templater = function(values) {
        var string  = template;
        var pattern = /(^|.|\r|\n)(#\{(.*?)\})/;
        while(match = string.match(pattern)) {
            string = string.replace(new RegExp(match[2], 'g'), values[match[3]]);
        }
        return string;
    };

    // now create the HTML for each word
    var html = '';
    for(var key in args.data) {
        // calculate the font size
        var size  = args.data[key] / avg;
        if(size < args.min_size ) {
            size = args.min_size;
        } else if( size > args.max_size ) {
            size = args.max_size;
        }
        var html = html + templater({ size: size + 'em', tag: key }) + ' ';
    }
    document.getElementById(args.target).innerHTML = html;
};

