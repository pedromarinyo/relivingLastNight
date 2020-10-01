/* 
TODO
	Parse xml into javascript objects.
	Append objects to array. 
	Create draw functions for static and choice tiles
*/

var choiceHistory = new Array();	// Key value pair; choiceIDs and choiceChosen
var icons = new Array(); 			// Handle icon loading

var c;								// Handle to html canvas
var parser;
var xmlTimeline;
var videoQueue;
var playhead = new fabric.Circle();

var tilePadding = 10;
var tileSize;
var tileWrapper;
var tileColor = "#c6ced0";
var playheadColor = "#fdfdfd";
var playStopColor = "#cecece";

var relivingLastNight = "<timeline><tile><!-- Specifies type of tile, either static or choice --><type>static</type>		<!-- File path to tile's icon --><name>Awaken</name><!-- A list of videos to play when arriving at this tile. --><!-- Choice of video depends on choiceChosen for given choiceID --><videos><video><path>./assets/videos/AWAKING.mp4</path></video></videos></tile><tile><!-- Specifies type of tile, either static or choice --><type>static</type>		<!-- File path to tile's icon --><name>A Choice of Dress</name><!-- A list of videos to play when arriving at this tile. --><!-- Choice of video depends on choiceChosen for given choiceID --><videos><video><path>./assets/videos/BCLOTHE.mp4</path></video></videos></tile><tile><type>choice</type>	<!-- File path to tile's icon --><name>Greeting Nick</name><!-- A list of choices to be arranged vertically --> <choices><choice><name>Dress</name><!-- File path to tile's icon --><iconPath>./assets/images/RLN_dress_large.png</iconPath><!-- A list of videos to play when arriving at this tile. Choice of video depends on choiceChosen for given choiceID --><videos><video><path>./assets/videos/BCLOTHED.mp4</path><condition><choiceID>0</choiceID><choiceChosen>0</choiceChosen></condition></video></videos>	<choiceID>0</choiceID><choiceChosen>0</choiceChosen></choice><choice><name>Sweater</name><!-- File path to tile's icon --><iconPath>./assets/images/RLN_sweater_large.png</iconPath><!-- A list of videos to play when arriving at this tile. Choice of video depends on choiceChosen for given choiceID --><videos><video><path>./assets/videos/BCLOTHEC.mp4</path><condition><choiceID>0</choiceID><choiceChosen>1</choiceChosen></condition></video></videos><choiceID>0</choiceID><choiceChosen>1</choiceChosen>			</choice></choices></tile><tile><!-- Specifies type of tile, either static or choice --><type>static</type>		<!-- File path to tile's icon --><name>A Choice of Drink</name><!-- A list of videos to play when arriving at this tile. --><!-- Choice of video depends on choiceChosen for given choiceID --><videos><video><path>./assets/videos/CDRINKD.mp4</path><condition><choiceID>0</choiceID><choiceChosen>0</choiceChosen></condition></video><video><path>./assets/videos/CDRINKC.mp4</path><condition><choiceID>0</choiceID><choiceChosen>1</choiceChosen></condition></video></videos></tile><tile><type>choice</type>	<!-- File path to tile's icon --><name>Picking a Drink</name><!-- A list of choices to be arranged vertically --> <choices><choice><name>Coke</name><!-- File path to tile's icon --><iconPath>./assets/images/RLN_coke_large.png</iconPath><!-- A list of videos to play when arriving at this tile. Choice of video depends on choiceChosen for given choiceID --><videos><video><path>./assets/videos/DDRINKDC.mp4</path><condition><choiceID>0</choiceID><choiceChosen>0</choiceChosen></condition><condition><choiceID>1</choiceID><choiceChosen>0</choiceChosen></condition>						</video><video><path>./assets/videos/DDRINKCC.mp4</path><condition><choiceID>0</choiceID><choiceChosen>1</choiceChosen></condition><condition><choiceID>1</choiceID><choiceChosen>0</choiceChosen></condition>						</video></videos>	<choiceID>1</choiceID><choiceChosen>0</choiceChosen></choice><choice><name>Vodka</name><!-- File path to tile's icon --><iconPath>./assets/images/RLN_vodka_large.png</iconPath><!-- A list of videos to play when arriving at this tile. Choice of video depends on choiceChosen for given choiceID --><videos><video><path>./assets/videos/DDRINKDV.mp4</path><condition><choiceID>0</choiceID><choiceChosen>0</choiceChosen></condition><condition><choiceID>1</choiceID><choiceChosen>1</choiceChosen></condition>						</video><video><path>./assets/videos/DDRINKCV.mp4</path><condition><choiceID>0</choiceID><choiceChosen>1</choiceChosen></condition><condition><choiceID>1</choiceID><choiceChosen>1</choiceChosen></condition>						</video></videos>	<choiceID>1</choiceID><choiceChosen>1</choiceChosen></choice></choices></tile><tile><!-- Specifies type of tile, either static or choice --><type>static</type>		<!-- File path to tile's icon --><name>Chatting</name><!-- A list of videos to play when arriving at this tile. --><!-- Choice of video depends on choiceChosen for given choiceID --><videos><video><path>./assets/videos/ECHATD.mp4</path><condition><choiceID>0</choiceID><choiceChosen>0</choiceChosen></condition>				</video><video><path>./assets/videos/ECHATC.mp4</path><condition><choiceID>0</choiceID><choiceChosen>1</choiceChosen></condition>				</video></videos></tile><tile><!-- Specifies type of tile, either static or choice --><type>static</type>		<!-- File path to tile's icon --><name>More Chatting</name><!-- A list of videos to play when arriving at this tile. --><!-- Choice of video depends on choiceChosen for given choiceID --><videos><video><path>./assets/videos/FCHATCC.mp4</path><condition><choiceID>0</choiceID><choiceChosen>1</choiceChosen></condition>				<condition><choiceID>1</choiceID><choiceChosen>0</choiceChosen></condition>				</video><video><path>./assets/videos/FCHATCV.mp4</path><condition><choiceID>0</choiceID><choiceChosen>1</choiceChosen></condition>				<condition><choiceID>1</choiceID><choiceChosen>1</choiceChosen></condition>				</video><video><path>./assets/videos/FCHATDC.mp4</path><condition><choiceID>0</choiceID><choiceChosen>0</choiceChosen></condition>				<condition><choiceID>1</choiceID><choiceChosen>0</choiceChosen></condition>				</video><video><path>./assets/videos/FCHATDV.mp4</path><condition><choiceID>0</choiceID><choiceChosen>0</choiceChosen></condition>				<condition><choiceID>1</choiceID><choiceChosen>1</choiceChosen></condition>				</video></videos></tile><tile><!-- Specifies type of tile, either static or choice --><type>static</type>		<!-- File path to tile's icon --><name>A Choice of Music</name><!-- A list of videos to play when arriving at this tile. --><!-- Choice of video depends on choiceChosen for given choiceID --><videos><video><path>./assets/videos/GMUSICC.mp4</path><condition><choiceID>0</choiceID><choiceChosen>1</choiceChosen></condition>				</video><video><path>./assets/videos/GMUSICD.mp4</path><condition><choiceID>0</choiceID><choiceChosen>0</choiceChosen></condition>				</video></videos></tile><tile><type>choice</type>	<!-- File path to tile's icon --><name>Picking Music</name><!-- A list of choices to be arranged vertically --> <choices><choice><name>Gigolo</name><!-- File path to tile's icon --><iconPath>./assets/images/RLN_gigolo_large.png</iconPath><!-- A list of videos to play when arriving at this tile. Choice of video depends on choiceChosen for given choiceID --><videos><video><path>./assets/videos/ICVG.mp4</path><condition><choiceID>0</choiceID><choiceChosen>1</choiceChosen></condition><condition><choiceID>1</choiceID><choiceChosen>0</choiceChosen></condition>		<condition><choiceID>2</choiceID><choiceChosen>0</choiceChosen></condition>		</video><video><path>./assets/videos/ICCG.mp4</path><condition><choiceID>0</choiceID><choiceChosen>1</choiceChosen></condition><condition><choiceID>1</choiceID><choiceChosen>1</choiceChosen></condition><condition><choiceID>2</choiceID><choiceChosen>0</choiceChosen></condition>							</video>	<video><path>./assets/videos/IDCG.mp4</path><condition><choiceID>0</choiceID><choiceChosen>0</choiceChosen></condition><condition><choiceID>1</choiceID><choiceChosen>1</choiceChosen></condition><condition><choiceID>2</choiceID><choiceChosen>0</choiceChosen></condition>							</video>				<video><path>./assets/videos/IDVG.mp4</path><condition><choiceID>0</choiceID><choiceChosen>0</choiceChosen></condition><condition><choiceID>1</choiceID><choiceChosen>1</choiceChosen></condition><condition><choiceID>2</choiceID><choiceChosen>0</choiceChosen></condition>							</video>	</videos>	<choiceID>2</choiceID><choiceChosen>0</choiceChosen>			</choice><choice><name>Kiss</name><!-- File path to tile's icon --><iconPath>./assets/images/RLN_kiss_large.png</iconPath><!-- A list of videos to play when arriving at this tile. Choice of video depends on choiceChosen for given choiceID --><videos><video><path>./assets/videos/IDCK.mp4</path><condition><choiceID>0</choiceID><choiceChosen>0</choiceChosen></condition><condition><choiceID>1</choiceID><choiceChosen>0</choiceChosen></condition>						<condition><choiceID>2</choiceID><choiceChosen>1</choiceChosen></condition>		</video><video><path>./assets/videos/IDVK.mp4</path><condition><choiceID>0</choiceID><choiceChosen>0</choiceChosen></condition><condition><choiceID>1</choiceID><choiceChosen>1</choiceChosen></condition>						<condition><choiceID>2</choiceID><choiceChosen>1</choiceChosen></condition>		</video><video><path>./assets/videos/ICCK.mp4</path><condition><choiceID>0</choiceID><choiceChosen>1</choiceChosen></condition><condition><choiceID>1</choiceID><choiceChosen>0</choiceChosen></condition>						<condition><choiceID>2</choiceID><choiceChosen>1</choiceChosen></condition>		</video><video><path>./assets/videos/ICVK.mp4</path><condition><choiceID>0</choiceID><choiceChosen>1</choiceChosen></condition><condition><choiceID>1</choiceID><choiceChosen>1</choiceChosen></condition>						<condition><choiceID>2</choiceID><choiceChosen>1</choiceChosen></condition>		</video></videos>	<choiceID>2</choiceID><choiceChosen>0</choiceChosen>			</choice></choices></tile><tile><!-- Specifies type of tile, either static or choice --><type>static</type>		<!-- File path to tile's icon --><name>Finale</name><!-- A list of videos to play when arriving at this tile. --><!-- Choice of video depends on choiceChosen for given choiceID --><videos><video><path>./assets/videos/JFINALEA.mp4</path><condition><choiceID>0</choiceID><choiceChosen>0</choiceChosen></condition>	<condition><choiceID>1</choiceID><choiceChosen>0</choiceChosen></condition>				</video><video><path>./assets/videos/JFINALEN.mp4</path><condition><choiceID>0</choiceID><choiceChosen>1</choiceChosen></condition>				<condition><choiceID>2</choiceID><choiceChosen>0</choiceChosen></condition>	</video><video><path>./assets/videos/JFINALEC.mp4</path><condition><choiceID>0</choiceID><choiceChosen>1</choiceChosen></condition>				<condition><choiceID>2</choiceID><choiceChosen>1</choiceChosen></condition>	</video><video><path>./assets/videos/JFINALEC.mp4</path><condition><choiceID>0</choiceID><choiceChosen>0</choiceChosen></condition>				<condition><choiceID>1</choiceID><choiceChosen>1</choiceChosen></condition>	<condition><choiceID>2</choiceID><choiceChosen>0</choiceChosen></condition>	</video><video><path>./assets/videos/JFINALENA.mp4</path><condition><choiceID>0</choiceID><choiceChosen>0</choiceChosen></condition>				<condition><choiceID>1</choiceID><choiceChosen>1</choiceChosen></condition>	<condition><choiceID>2</choiceID><choiceChosen>1</choiceChosen></condition>	</video></videos></tile></timeline>";

// Initialization
function init(){
	// Create a wrapper around canvas element.
	// Expand canvas to match window height and width. 
	c = new fabric.Canvas("canvas");
	c.setWidth(window.innerWidth); 

	// Allows for user to select XML file
	// const fileSelector = document.getElementById('file-selector');
	// fileSelector.addEventListener('change', (event) => {
	// 	fileList = event.target.files;
	// 	console.log(fileList);
	// 	reader.readAsText(fileList[0]);
	// });

	// Reads XML file once selected
	//const reader = new FileReader();
	//reader.addEventListener('load', (event) => {

		//Once done, resize canvas to fit window and remove file input
		c.setHeight(window.innerHeight * (2 / 3));		
		
		document.getElementById("file-selector").style.display = "none";
		
		document.getElementById("video").height = window.innerHeight / 3;
		document.getElementById("video").style.display = "block";

		// Parse XML Timeline
		parser = new DOMParser();
		//xmlTimeline = parser.parseFromString(event.target.result,"text/xml");
		xmlTimeline = parser.parseFromString(relivingLastNight,"text/xml");
		
		// Preload images from timeline; once done, drawTimeline()				
		preloadImages(xmlTimeline, function (){
			drawTimeline(xmlTimeline);
			drawPlayStopButton();
		});

		
	//});
	
}

// ____________________________________

function preloadImages(xml, callback) {


	var xmlArray = xml.getElementsByTagName("tile");
	var numIcons = 0; 
	var numIconsLoaded = 0;

	// Counting number of images, one per choice tile
	for (var i = 0; i <= xmlArray.length - 1; i++) {
	// If of type choice...
		if (xmlArray[i].getElementsByTagName("type")[0].childNodes[0].nodeValue == "choice") {
			numIcons += xmlArray[i].getElementsByTagName("choices")[0].children.length;
		}
	}

	// Creating icon images, storing in icons array
	for (var i = 0; i <= xmlArray.length - 1; i++) {
		
		// If of type choice...
		if (xmlArray[i].getElementsByTagName("type")[0].childNodes[0].nodeValue == "choice") {
			
			// Get choices
			var choicesArray = xmlArray[i].getElementsByTagName("choices")[0].children;
			for (var j = choicesArray.length - 1; j >= 0; j--) {
				
				var imagePath = choicesArray[j].getElementsByTagName("iconPath")[0].childNodes[0].nodeValue;
				var img = new Image();
				img.src = imagePath; 
				icons.push(img);

				img.onload = function(){ 
					// Increase number loaded, then check if it's the last image that needs loading
					numIconsLoaded += 1;
					if(numIconsLoaded >= numIcons) {
						// If so, draw timeline
						callback();
					}

				}
			}
		}
	}
}

function drawTimeline(xml){
	
	var xmlArray = xml.getElementsByTagName("tile");	// Stores xml objects
	var tileArray = [];									// Stores fabric objects

	// Diving canvas width by number of tiles, xmlArray.length
	// Determining tile width subtracting padding * 2	
	tileWrapper = (c.width / xmlArray.length);		// Individual tile wrapper with padding
	tileSize = tileWrapper - (tilePadding * 2);  	// Tile width without padding 
	
	// Keeping track of which icons to display
	var iconIndex = 0;

	
	for (var i = 0; i <= xmlArray.length - 1; i++) {
		// Get tile type
		var type = xmlArray[i].getElementsByTagName("type")[0].childNodes[0].nodeValue;
		var label = xmlArray[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;		

		// If tile is of type "static", draw tile with icon
		if (type == "static") {
			// Create a rectangle object
			var rect = new fabric.Rect({
				left: (tileWrapper * i) + tilePadding,
				originY: "center",
				top: c.height / 2,
				fill: tileColor,
				width: tileSize,
				height: tileSize,
				rx: 10,
				ry: 10,
				hoverCursor: "default",
				selectable: false
			});
			rect.set('shadow', new fabric.Shadow({
				blur: 10,
		        color: 'rgba(0,0,0,0.5)',
		        offsetX: 10,
		        offsetX: 10
			}));

			// Create tile label text
			var label = new fabric.Textbox(label, {
			  	left: (tileWrapper * i) + (tilePadding * 2),
				originY: "top",
				top: (c.height / 2) - (tileSize / 3) + tilePadding,
			  	fontSize: 14,
			  	fill: '#111',
			  	width: tileSize - (tilePadding * 2),
			  	textAlign: "center",
			  	fontFamily: "Helvetica",
			  	hoverCursor: "default",
			  	selectable: false
			});

			// Add fabric tile object to array
			tileArray.push(rect);
			tileArray.push(label);			
		}

		// If tile is of type "choice", draw choice column
		else if (type = "choice") {
			
			// Getting choices, storing in choicesArray
			var choicesArray = xmlArray[i].getElementsByTagName("choices")[0].children;
			var verticalGroup = new fabric.Group([], {
				width: tileSize,
				height: tileSize * choicesArray.length * 2,
				left: (tileWrapper * i) + tilePadding,
				top: c.height / 2,
				originY: "center",
				lockMovementX: true,
				hasControls: false,
				hasBorders: false
			});

			for (var j = choicesArray.length - 1; j >= 0; j--) {
				// Create a rectangle object
				var rect = new fabric.Rect({
					originY: "center",
					originX: "center",
					top: 0 - (tileSize * j),
					fill: tileColor,
					width: tileSize,
					height: tileSize - 10,
					rx: 10,
					ry: 10,
					hoverCursor: "default",
					selectable: false
				});	
				rect.set('shadow', new fabric.Shadow({
					blur: 10,
			        color: 'rgba(0,0,0,0.5)',
			        offsetX: 10,
			        offsetX: 10
				}));
				
				// Add rect to vertical group
				verticalGroup.add(rect);

				// Adding icon for each choice			
				var img = new fabric.Image(icons[iconIndex], { 
					left: 0, 
					top: 0 - (tileSize * j), 
					// width: tileSize, 
					// height: tileSize - 10,
					originX: "center",
					originY: "center",
					scaleX: (tileSize - 10) / icons[iconIndex].width,
					scaleY: (tileSize - 10) / icons[iconIndex].width
				});	

				img.set('shadow', new fabric.Shadow({
					blur: 10,
			        color: 'rgba(0,0,0,0.5)',
			        offsetX: 10,
			        offsetX: 10
				}));			
				
				iconIndex++;  	
				verticalGroup.add(img);	
			}

			// Saving default choices
			var whichChoice = i; //Math.floor(verticalGroup.left / tileWrapper);
			choiceHistory.push({id: whichChoice, choiceName: label, numChoices: choicesArray.length, choiceChosen: 0});

			verticalGroup.on({
				"mouseup": function(e){
					
					if (e.target) {
						
						// Stores the choice that's currently being manipulated
						var whichChoice = Math.floor(e.target.left/ tileWrapper);

						// Calculates which tile is selected for given choice
						var tileTop = (((e.target.top) - (c.height / 2)) / tileSize); 
						var whichTile = (tileTop % 1 > 0.5) ? Math.floor(tileTop) + 1 : Math.floor(tileTop);

						// Getting number of choices available 
						var numChoices = choiceHistory.find(x => x.id === whichChoice).numChoices;

						if(whichTile >= numChoices) { whichTile = numChoices - 1 }
						else if (whichTile < 0) { whichTile = 0; }

						// Animation
						var top = (c.height  / 2) + (tileSize * whichTile);
						e.target.animate(
							'top', 
							top,
							{
								duration: 300,
								onChange: c.renderAll.bind(c),
								easing: fabric.util.ease.easeOutBounce
							}
						);

						// Saving choice
						console.log(whichChoice + " : " + whichTile);
						choiceHistory.find(x => x.id === whichChoice).choiceChosen = whichTile;
						console.log(choiceHistory);

					}
					
				}
			});

			// Push group to tile array as next tile
			tileArray.push(verticalGroup);
			c.renderAll();
		}		
	}

	console.log(choiceHistory);

	for (var i = 0; i <= tileArray.length - 1; i++) {
		c.add(tileArray[i]);
	}

	c.renderAll();
}

function drawPlayStopButton() {
	
	var top = 0.1; 

	drawPlayhead();

	// Play button
	var triangle = new fabric.Triangle({
		originY: "center",
		originX: "center",
    	width: 30, height: 30, left: c.width/2 - 50, top: c.height * (top), fill: '#fff'
  	});

  	var circle = new fabric.Circle({
  		originY: "center",
		originX: "center",
    	radius: 35, left: c.width/2 - 50, top: c.height * (top), fill: playStopColor
  	});
  	circle.set('shadow', new fabric.Shadow({
		blur: 10,
        color: 'rgba(0,0,0,0.5)',
        offsetX: 10,
        offsetX: 10
	}));

  	triangle.rotate(90);
  	var playButton = new fabric.Group([circle, triangle], {
  		hasBorders: false,
  		hasControls: false,
  		hoverCursor: "default",
		selectable: false
  	});
  	triangle.set('shadow', new fabric.Shadow({
		blur: 10,
        color: 'rgba(0,0,0,0.5)',
        offsetX: 10,
        offsetX: 10
	}));

	
  	c.add(playButton);
  	c.bringToFront(playButton);

  	playButton.on({"mouseup": function(e) {
  		createVideoQueue();
	}});

	// Stop button
	var circleStop = new fabric.Circle({
  		originY: "center",
		originX: "center",
    	radius: 35, left: c.width/2 + 50, top: c.height * (top), fill: playStopColor
  	});
  	circleStop.set('shadow', new fabric.Shadow({
		blur: 10,
        color: 'rgba(0,0,0,0.5)',
        offsetX: 10,
        offsetX: 10
	}));

	var rect = new fabric.Rect({
  		originY: "center",
		originX: "center",
    	width: 25, height: 25, left: c.width/2 + 50, top: c.height * (top), fill: '#fff'
  	});
  	rect.set('shadow', new fabric.Shadow({
		blur: 10,
        color: 'rgba(0,0,0,0.5)',
        offsetX: 10,
        offsetX: 10
	}));

	var stopButton = new fabric.Group([circleStop, rect], {
  		hasBorders: false,
  		hasControls: false,
  		hoverCursor: "default",
		selectable: false
  	});

  	c.add(stopButton);
  	c.bringToFront(stopButton);

  	stopButton.on({"mouseup": function(e) {
  		stopVideo();
	}});


}

function createVideoQueue() {
	console.log(xmlTimeline.getElementsByTagName("tile"));

	var timeline = xmlTimeline.getElementsByTagName("tile");
	var videoPaths = new Array(); 
	var videoIndex = 0;
	
	// Creating timeline of video paths
	while (videoIndex < timeline.length ) {

		// For static tiles...
		var type = timeline[videoIndex].getElementsByTagName("type")[0].childNodes[0].nodeValue;
		
		if(type == "static") {
			// Getting videos
			var videos = timeline[videoIndex].getElementsByTagName("videos")[0].children;
			
			// Getting conditions for each video
			for (var i = 0; i < videos.length; i++) {
				var conditions = videos[i].getElementsByTagName("condition"); 

				// If there're are no conditions, add this video path to queue; break. 
				if(conditions.length == 0) {
					videoPaths.push(videos[i].getElementsByTagName("path")[0].childNodes[0].nodeValue);
					break;
				}

				var meetsConditions = true; 
				// If conditions exist, add first video that meets conditions
				for(var j = 0; j < conditions.length; j++){
					var choiceID = conditions[j].getElementsByTagName("choiceID")[0].childNodes[0].nodeValue; 
					var choiceChosen = conditions[j].getElementsByTagName("choiceChosen")[0].childNodes[0].nodeValue; ; 

					// Check if condition is met; if not, change conditionFlag to false.
					if (choiceHistory[choiceID].choiceChosen != choiceChosen)  {
						meetsConditions = false; 												
					}
				}

				//  If condition flag is still true, queue path and break				
				if(meetsConditions) {
					videoPaths.push(videos[i].getElementsByTagName("path")[0].childNodes[0].nodeValue);
					break;	
				}
				
			}			
		}

		// For choice tiles...
		else if(type == "choice") {
			// Getting videos of selected choice			
			var choice = timeline[videoIndex].getElementsByTagName("choices")[0].children[choiceHistory.find(choice => choice.id == videoIndex).choiceChosen];
			var videos = choice.getElementsByTagName("videos")[0].children;

			//console.log(videos);

			// Loop through each possible video...
			for (var i = 0; i < videos.length; i++) {
				// Get conditions for each video
				var conditions = videos[i].getElementsByTagName("condition"); 

				var meetsConditions = true; 
				// If conditions exist, add first video that meets conditions
				for(var j = 0; j < conditions.length; j++){
					var choiceID = conditions[j].getElementsByTagName("choiceID")[0].childNodes[0].nodeValue; 
					var choiceChosen = conditions[j].getElementsByTagName("choiceChosen")[0].childNodes[0].nodeValue; ; 

					// Check if condition is met; if not, change conditionFlag to false.
					if (choiceHistory[choiceID].choiceChosen != choiceChosen)  {
						meetsConditions = false; 											
					}
				}

				//  If condition flag is still true, queue path and break				
				if(meetsConditions) {
					videoPaths.push(videos[i].getElementsByTagName("path")[0].childNodes[0].nodeValue);
					break;	
				}
			}


			//console.log(choice);
		}
			
		videoIndex++;
	}
	
	// Saving paths to global videoQueue
	console.log(videoPaths);
	videoQueue = videoPaths;	

	playVideo();
}

function playVideo() {
	// Getting video element
	var videoPlayer = document.getElementById("video");
	
	// Adding on ended event; progresses to next video in queue
	var queueIndex = 0;
	videoPlayer.onended = function() {
		queueIndex++;
		if(queueIndex < videoQueue.length) {
			videoPlayer.src = videoQueue[queueIndex];
			videoPlayer.play();
			console.log(videoQueue[queueIndex]);
			movePlayhead(queueIndex);
		}
	}

	// Setting source of video element to first video
	videoPlayer.src = videoQueue[0];

	// Playing video
	videoPlayer.play();
	
}

function stopVideo() {
	var videoPlayer = document.getElementById("video");
	videoPlayer.pause();
	videoPlayer.src = videoQueue[0];

	movePlayhead(0);
}

function drawPlayhead() {
	playhead.set({
  		originY: "center",
		originX: "center",
    	radius: tileSize, left: tileWrapper / 2, top: c.height * 0.5, fill: playheadColor
  	});
  	playhead.set('shadow', new fabric.Shadow({
		blur: 10,
        color: 'rgba(0,0,0,0.5)',
        offsetX: 10,
        offsetX: 10
	}));

	c.add(playhead);
	playhead.sendToBack();
}

function movePlayhead(index) {

	playhead.animate(
		'left', 
		(tileWrapper * index) + (tileWrapper / 2),
		{
			duration: 1000,
			onChange: c.renderAll.bind(c),
			easing: fabric.util.ease.easeOutBounce
		}
	);
	c.renderAll();
	playhead.sendToBack();
}