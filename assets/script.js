(function(e,b){if(!b.__SV){var a,f,i,g;window.mixpanel=b;b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user".split(" ");
for(g=0;g<i.length;g++)f(c,i[g]);b._i.push([a,e,d])};b.__SV=1.2;a=e.createElement("script");a.type="text/javascript";a.async=!0;a.src=("https:"===e.location.protocol?"https:":"http:")+'//cdn.mxpnl.com/libs/mixpanel-2.2.min.js';f=e.getElementsByTagName("script")[0];f.parentNode.insertBefore(a,f)}})(document,window.mixpanel||[]);

require(["gitbook"], function(gitbook) {
    var isAvailable = function() {
        return (
            typeof mixpanel !== "undefined" &&
            typeof mixpanel.track === "function" &&
            typeof mixpanel.identify === "function" &&
            typeof mixpanel.people.set === "function" &&
            typeof mixpanel.people.set_once === "function"
        );
    };

    var rando = function(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    };

    var anonify = function() {
      var adjective = rando(['adorable', 'beautiful', 'clean', 'elegant', 'fancy', 'glamorous', 'handsome', 'long', 'magnificent', 'quaint', 'sparkling', 'agreeable', 'brave', 'calm', 'delightful', 'eager', 'faithful', 'gentle', 'happy', 'jolly', 'kind', 'lively', 'nice', 'proud', 'relieved', 'silly', 'thankful', 'victorious', 'witty', 'zealous']);
      var color = rando(['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'gray', 'black', 'white', 'cyan', 'magenta', 'crimson']);
      var animal = rando(['aardvark', 'albatross', 'alligator', 'alpaca', 'ant', 'anteater', 'antelope', 'armadillo', 'baboon', 'badger', 'barracuda', 'bass', 'bat', 'bear', 'beaver', 'bird', 'bison', 'bittern', 'bloodhound', 'boar', 'bobcat', 'bovine', 'buffalo', 'bullfinch', 'bullock', 'butterfly', 'buzzard', 'camel', 'caribou', 'cat', 'cattle', 'cheetah', 'chicken', 'chimpanzee', 'chinchilla', 'clam', 'cod', 'colt', 'cow', 'coyote', 'crab', 'crane', 'crocodile', 'crow', 'deer', 'dog', 'dolphin', 'donkey', 'dove', 'duck', 'eagle', 'elephant', 'elk', 'ewe', 'falcon', 'ferret', 'finch', 'fish', 'flamingo', 'fly', 'flying-fish', 'fowl', 'fox', 'frog', 'gerbil', 'giraffe', 'gnat', 'goat', 'goldfinch', 'goldfish', 'goose', 'gorilla', 'grasshopper', 'greyhound', 'grouse', 'hamster', 'hare', 'hawk', 'hedgehog', 'hen', 'heron', 'herring', 'hippopotamus', 'hornet', 'horse', 'hound', 'hummingbird', 'hyena', 'hyrax', 'impala', 'jackrabbit', 'jellyfish', 'kangaroo', 'kitten', 'koala', 'lark', 'lemur', 'leopard', 'lion', 'llama', 'lobster', 'lynx', 'mackerel', 'magpie', 'mallard', 'manatee', 'meerkat', 'mink', 'minnow', 'mole', 'monkey', 'moose', 'mosquito', 'mouse', 'mule', 'muskrat', 'nighthawk', 'nightingale', 'orangutan', 'ostrich', 'otter', 'owl', 'oyster', 'panda', 'parrot', 'partridge', 'peacock', 'peafowl', 'pelican', 'penguin', 'pheasant', 'pigeon', 'pike', 'polecat', 'pony', 'porcupine', 'porpoise', 'possum', 'quail', 'rabbit', 'raccoon', 'racoon', 'raven', 'reindeer', 'rhinoceros', 'rooster', 'salmon', 'sandpiper', 'sardine', 'scorpion', 'seal', 'shark', 'sheep', 'sparrow', 'squirrel', 'stallion', 'starling', 'stork', 'swallow', 'swan', 'swine', 'swordfish', 'tiger', 'toad', 'tortoise', 'toucan', 'trout', 'turkey', 'turtle', 'wallaby', 'walrus', 'whale', 'wolf', 'wombat', 'woodpecker', 'wren', 'yak', 'zebra']);
      var modifier = (Math.floor((Math.random() * 10000) + 1)).toString();

      return {
        username: `${adjective}-${color}-${animal}-${modifier}`,
        email: `${adjective}-${animal}@${color}-${modifier}.com`
      };
    };

    var track = function(e, data) {
      data = data || {};
      data.Section = gitbook.state.chapterTitle;
      mixpanel.track(e, data);
    };

    gitbook.events.bind("start", function(e, config) {
      config.mixpanel = config.mixpanel || {};
      mixpanel.init(config.mixpanel.token);
      var user = anonify();
      if(isAvailable())
      {
        if(typeof(Storage) !== "undefined") {
          if(localStorage.getItem("packt-user")) {
            user = JSON.parse(localStorage.getItem("packt-user"));
          } else {
            localStorage.setItem("packt-user", JSON.stringify(user));
          };
        };

        mixpanel.identify(user.username);
        mixpanel.people.set({
          "$username": user.username,
          "$name": user.username,
          "$email": user.email
        });
        mixpanel.people.set_once({
          "$created": new Date().toLocaleString()
        });
      };
    });

    gitbook.events.bind("page.change", function() {
      if(document.getElementsByClassName('video-js')[0]){
        videojs(document.getElementsByClassName('video-js')[0], {}, function() {});
      };
      if(isAvailable()) {
        track(gitbook.state.filepath);
      };
    });
});
