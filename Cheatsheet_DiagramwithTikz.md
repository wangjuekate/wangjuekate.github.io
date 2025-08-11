\documentclass[border=5mm]{standalone}
\usepackage[utf8]{inputenc}
\usepackage[italian]{babel}
\usepackage{tikz}
\usetikzlibrary{shapes, positioning, arrows.meta}

\begin{document}

\begin{tikzpicture}[
    ball/.style={
        ellipse,
        minimum width=3cm,
        minimum height=1.5cm,
        draw,
        align=center
    },
    >=Stealth, % Better arrow tips
    node distance=1.5cm and 2cm
]

% Nodes
\node[ball] (classeA) {classe A};
\node[ball, right=of classeA] (classeB) {classe B};
\node[ball, above right=1.5cm and 1cm of classeA] (loaderL) {loader L};
\node[draw, rectangle, minimum width=2cm, minimum height=1cm, right=of loaderL] (bytecode) {bytecode};

% Arrows
\draw (bytecode) -- node[above] {caricamento} (loaderL);
\draw[->] (loaderL) -- (classeB) coordinate[midway] (LtoB);
\draw[->] (loaderL) -- (classeA);
\draw[->] (classeA) to[bend left] node[above, sloped] {intercetta} (LtoB);

\end{tikzpicture}

\end{document}


\begin{tikzpicture}[ 
  ball/.style={ 
    ellipse,                    % Shape of the node will be an ellipse
    minimum width=3cm,          # Minimum width of the node
    minimum height=1.5cm,       # Minimum height of the node
    draw,                       # Draw a border around the node
    align=center                # Center the text inside the node
  }, 
  >=Stealth,                    # Use Stealth arrow tips 
  node distance=1.5cm and 2cm   # Set default distances between nodes:
                               # - 1.5cm vertical distance
                               # - 2cm horizontal distance
]

