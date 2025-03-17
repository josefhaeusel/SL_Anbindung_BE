import numpy as np
import base64



class WaveToSVG(object):
    def __init__(self, y, sr, highlight_times):

        self.y = np.abs(y)  # Use absolute amplitude to avoid negative values
        self.sr = sr
        self.highlight_times = highlight_times



    def generate_svg_waveform(self,  output_svg=None, num_samples=150):
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

        # SVG parameters
        width = 800  # SVG width
        height = 80  # SVG height
        gap = 3  # Gap between bars
        bar_width = (width / num_samples) - gap  # Bar width with spacing

        # Normalize amplitudes to fit SVG height
        max_amplitude = np.max(amplitudes)
        amplitudes = (amplitudes / max_amplitude) * (height/2)  # Scale to half-height (50)

        highlight_start_idx = int((self.highlight_times["start"] / (len(self.y) / self.sr)) * num_samples)
        highlight_end_idx = int((self.highlight_times["end"] / (len(self.y) / self.sr)) * num_samples)

        # Start SVG string
        svg_content = f'<svg width="{width}" height="{height}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}">\n'
        # svg_content += '<rect width="100%" height="100%" fill="white"/>\n'  # Background

        # Draw rounded waveform bars with gaps
        for i, amp in enumerate(amplitudes):
            x = i * (bar_width + gap)  # Adjust x position to include the gap
            bar_height = amp * 2  # Double the amplitude for full scale
            y = (height / 2) - (bar_height / 2)  # Center vertically
            opacity = 1.0 if highlight_start_idx <= i <= highlight_end_idx else 0.3

            svg_content += f'<rect x="{x:.2f}" y="{y:.2f}" width="{bar_width:.2f}" height="{bar_height:.2f}" fill="black" rx="0.5" ry="0.5" opacity="{opacity}"/>\n'

        # Close SVG
        svg_content += "</svg>"

        # Save to file
        if output_svg:
            with open(output_svg, "w") as f:
                f.write(svg_content)
            
            return {"path": output_svg}
        else:
            return {"path": "No path given. Raw svg is returned", "content": svg_content}
            
    def generate_svg_fluent_waveform(self, output_svg=None, num_samples=800):
        width = 800  # SVG width
        height = 80  # SVG height

        # Downsample signal
        window_size = len(self.y) // num_samples
        amplitudes = np.array([np.mean(self.y[i * window_size: (i + 1) * window_size]) for i in range(num_samples)])
        max_amplitude = np.max(amplitudes)
        amplitudes = (amplitudes / max_amplitude) * (height / 2)  # Normalize to half height

        # Calculate x positions
        x_positions = np.linspace(0, width, num_samples)

        # Create full waveform points
        points_top = []
        points_bottom = []

        for x, amp in zip(x_positions, amplitudes):
            y = (height / 2) - amp
            points_top.append(f"{x:.2f},{y:.2f}")

        for x, amp in zip(reversed(x_positions), reversed(amplitudes)):
            y = (height / 2) + amp
            points_bottom.append(f"{x:.2f},{y:.2f}")

        all_points = points_top + points_bottom
        path_data = "M " + " L ".join(all_points) + " Z"

        # Highlight in pixel space
        duration = len(self.y) / self.sr
        highlight_start_x = (self.highlight_times["start"] / duration) * width
        highlight_end_x = (self.highlight_times["end"] / duration) * width

        svg_content = f'<svg width="{width}" height="{height}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}">\n'

        # Draw base waveform (full waveform with low opacity)
        svg_content += f'<path d="{path_data}" fill="black" opacity="0.3"/>\n'

        # Highlight mask rectangle
        svg_content += f'''
        <defs>
            <clipPath id="highlight-clip">
                <rect x="{highlight_start_x:.2f}" y="0" width="{highlight_end_x - highlight_start_x:.2f}" height="{height}" />
            </clipPath>
        </defs>
        '''

        # Draw highlighted section by reusing same waveform path but clipped
        svg_content += f'<path d="{path_data}" fill="black" opacity="0.5" clip-path="url(#highlight-clip)"/>\n'

        svg_content += "</svg>"

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

  