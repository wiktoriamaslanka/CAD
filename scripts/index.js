document.addEventListener("DOMContentLoaded", function(event) {
    $(document).ready(function() {
        new WOW().init();

        var selectedClass = "";
        $(".filter").click(function() {
            selectedClass = $(this).attr("data-rel");
            $("#gallery").fadeTo(100, 0.1);
            $("#gallery div").not("." + selectedClass).fadeOut().removeClass('animation');
            setTimeout(function() {
                $("." + selectedClass).fadeIn().addClass('animation');
                $("#gallery").fadeTo(300, 1);
            }, 300);
        });

        $(".tech-icons div")
            .mouseover(function() {
                //get p selector with description
                let p = this.children[1];
                $(p).css("opacity", 1);
                $(p).addClass("icons-mouseover");
                //get i selector 
                let i = this.children[0];
                $(i).css("color", "rgba(248, 0, 62, 0.4)");
                $(i).css("transition", "1s");

            })
            .mouseout(function() {
                let p = this.children[1];
                $(p).css("opacity", 0);
                $(p).removeClass("icons-mouseover");
                let i = this.children[0];
                $(i).css("color", "#212529");
            });


        //generate elements in section Portfolio
        $.getJSON("./scripts/portfolio.json", function(json) {
            generatePortfolioTab(Object.values(json));
            generatePortfolioModal(Object.values(json));
        });

        //show only web/mobile projects
        $("#portfolio-all").click(function() {
            $(".card").hide();
            $(".cardsContainer-web").show();
            $(".cardsContainer-mobile").show();
        });

        $("#portfolio-web").click(function() {
            $(".card").hide();
            $(".cardsContainer-web").show();
        });

        $("#portfolio-mobile").click(function() {
            $(".card").hide();
            $(".cardsContainer-mobile").show();
        });


    })
})

const generatePortfolioTab = (data) => {
    data.map((portfolioObjects) => {
        let cardsContainer = $('#cardsContainer');
        cardsContainer.append(` 
        <div class="col-md-12 col-lg-4">
            <a class='card hoverable mb-4 cardsContainer-${portfolioObjects.type}' data-toggle='modal' data-target='#modal-${portfolioObjects.id}' id='${portfolioObjects.id}'> 
                <img class = 'card-img-top' src = '${portfolioObjects.previewImgSrc}' alt = '${portfolioObjects.name} page image' >
                <div class = 'card-body'>
                    <h5 class = 'my-3'> ${portfolioObjects.name} </h5> 
                    <p class = 'card-text text-uppercase mb-3' > ${portfolioObjects.shortDescription} </p>
                </div>
            </a>
        </div>`)
    })
};

const generatePortfolioModal = (data) => {
    data.map((portfolioObjects) => {
        let modalsContainer = $('#modalsContainer');

        modalsContainer.append(` 
        <div class="modal fade" id="modal-${portfolioObjects.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body p-0">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>

                    <div class="row">
                        <div class="col">
                            <h5 class="font-weight-bold mb-3 modal-pink-header">${portfolioObjects.name}</h5>
                            <p class="text-muted">${portfolioObjects.longDescription}</p>

                            <hr>


                            <ul class="list-unstyled font-small">
                                <li>
                                    <p class="text-uppercase mb-2"><strong>Live</strong></p>
                                    <p class="mb-4"><a href="${portfolioObjects.live}" target="_blank" class="text-muted">${portfolioObjects.live}</a></p>
                                    
                                </li>

                                <li>
                                    <p class="text-uppercase mb-2"><strong>Code</strong></p>
                                    <p class="mb-4"><a href="${portfolioObjects.code}" target="_blank" class="text-muted">${portfolioObjects.code}</a></p>                              
                                </li>

                                <li>
                                    <p class="text-uppercase mb-2"><strong>Technologie</strong></p>
                                    <p class="text-muted mb-4">${portfolioObjects.technologies}</p>
                                </li>

                                <li>
                                    <p class="text-uppercase mb-2"><strong>Data stworzenia</strong></p>
                                    <p class="text-muted">${portfolioObjects.date}</p>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`)
    })
};