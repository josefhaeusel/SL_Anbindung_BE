import numpy as np


import base64



class WaveToSVG(object):
    def __init__(self, y, sr):

        self.y = np.abs(y)  # Use absolute amplitude to avoid negative values
        self.sr = sr


    def generate_svg_waveform(self,  output_svg=None, num_samples=100):
        """
        Generates a modern SVG waveform from an audio file with rounded bars and gaps.

        :param audio_file: Path to the audio file.
        :param output_svg: Path to save the generated SVG.
        :param num_samples: Number of bars to use for downsampling.
        """

        # Load audio file


        # Calculate window size for averaging
        window_size = len(self.y) // num_samples  
        amplitudes = np.array([np.sum(self.y[i * window_size: (i + 1) * window_size]) for i in range(num_samples)])

        # Normalize amplitudes to fit SVG height
        max_amplitude = np.max(amplitudes)
        amplitudes = (amplitudes / max_amplitude) * 50  # Scale to half-height (50)

        # SVG parameters
        width = 400  # SVG width
        height = 100  # SVG height
        gap = 2  # Gap between bars
        bar_width = (width / num_samples) - gap  # Bar width with spacing

        # Start SVG string
        svg_content = f'<svg width="{width}" height="{height}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}">\n'
        # svg_content += '<rect width="100%" height="100%" fill="white"/>\n'  # Background

        # Draw rounded waveform bars with gaps
        for i, amp in enumerate(amplitudes):
            x = i * (bar_width + gap)  # Adjust x position to include the gap
            bar_height = amp * 2  # Double the amplitude for full scale
            y = (height / 2) - (bar_height / 2)  # Center vertically

            svg_content += f'<rect x="{x:.2f}" y="{y:.2f}" width="{bar_width:.2f}" height="{bar_height:.2f}" fill="black" rx="5" ry="5"/>\n'

        # Close SVG
        svg_content += "</svg>"

        # Save to file
        if output_svg:
            with open(output_svg, "w") as f:
                f.write(svg_content)
            
            return {"path": output_svg}
        else:
            return {"path": "No path given. Raw svg is returned", "content": svg_content}
        

    def encode_svg_to_data_url(self, svg_path):
        with open(svg_path, "rb") as f:
            svg_data = f.read()
        encoded_svg = base64.b64encode(svg_data).decode("utf-8")
        return f"data:image/svg+xml;base64,{encoded_svg}"

        
